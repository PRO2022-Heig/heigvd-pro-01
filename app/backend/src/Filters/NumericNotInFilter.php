<?php

namespace App\Filters;

use ApiPlatform\Core\Bridge\Doctrine\Common\Filter\NumericFilterTrait;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractContextAwareFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\PropertyInfo\Type;

class NumericNotInFilter extends AbstractContextAwareFilter
{
    use NumericFilterTrait;

    /**
     * Type of numeric in Doctrine.
     *
     * @see http://doctrine-orm.readthedocs.org/projects/doctrine-dbal/en/latest/reference/types.html
     */
    public const DOCTRINE_NUMERIC_TYPES = [
        Types::BIGINT => true,
        Types::DECIMAL => true,
        Types::FLOAT => true,
        Types::INTEGER => true,
        Types::SMALLINT => true,
    ];

    protected function filterProperty(
        string $property,
        $value,
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        string $operationName = null
    ) {
        if (str_starts_with($property, "not_in_")) {
            $property = str_replace("not_in_", "", $property);
        } else {
            return;
        }
        if (
            !$this->isPropertyEnabled($property, $resourceClass) ||
            !$this->isPropertyMapped($property, $resourceClass) ||
            !$this->isNumericField($property, $resourceClass)
        ) {
            return;
        }

        $values = $this->normalizeValues($value, $property);
        if (null === $values) {
            return;
        }

        $alias = $queryBuilder->getRootAliases()[0];
        $field = $property;

        if ($this->isPropertyNested($property, $resourceClass)) {
            [$alias, $field] = $this->addJoinsForNestedProperty($property, $alias, $queryBuilder, $queryNameGenerator, $resourceClass);
        }

        $valueParameter = $queryNameGenerator->generateParameterName($field);

        if (1 === \count($values)) {
            $queryBuilder
                ->andWhere(sprintf("%s.%s != :%s", $alias, $field, $valueParameter))
                ->setParameter($valueParameter, $values[0], (string) $this->getDoctrineFieldType($property, $resourceClass));
        } else {
            $queryBuilder
                ->andWhere(sprintf("%s.%s NOT IN (:%s)", $alias, $field, $valueParameter))
                ->setParameter($valueParameter, $values);
        }
    }

    public function getDescription(string $resourceClass): array
    {
        if (!$this->properties) {
            return [];
        }

        $description = [];
        foreach ($this->properties as $property => $strategy) {
            $propertyName = $this->normalizePropertyName($property);
            $filterParameterNames = [$propertyName, $propertyName . "[]"];
            foreach ($filterParameterNames as $filterParameterName) {
                $description["not_in_" . $property . "[]"] = [
                    "property" => $propertyName,
                    "type" => $this->getType((string) $this->getDoctrineFieldType($property, $resourceClass)),
                    "required" => false,
                    "swagger" => [
                        "description" => "Check not in",
                        "name" => "Custom name to use in the Swagger documentation",
                        "type" => "Will appear below the name in the Swagger documentation"
                    ],
                    "is_collection" => str_ends_with((string) $filterParameterName, "[]")
                ];
            }
        }

        return $description;
    }

    /**
     * {@inheritdoc}
     */
    protected function getType(string $doctrineType = null): string
    {
        if (null === $doctrineType || Types::DECIMAL === $doctrineType) {
            return "string";
        }

        if (Types::FLOAT === $doctrineType) {
            return "float";
        }

        return "int";
    }
}
