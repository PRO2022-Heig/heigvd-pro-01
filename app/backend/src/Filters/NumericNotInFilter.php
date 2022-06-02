<?php

namespace App\Filters;

use ApiPlatform\Core\Bridge\Doctrine\Common\Filter\NumericFilterTrait;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractContextAwareFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\QueryBuilder;

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

        if (!is_array($values)) {
            // Only manage "NOT IN"
            $values = [$values];
        }

        // Default alias and field
        $tblAlias = $queryBuilder->getRootAliases()[0];
        $field = $property;
        // Name of the PDO parameter
        $valueParameter = $queryNameGenerator->generateParameterName($field);

        if ($this->isPropertyNested($property, $resourceClass)) {
            // TODO: create a "NotInRelationsFilter" and let this one as a simple NOT IN?
            // Use another alias than the default the nested query
            $nestedAlias = "o_n";
            $nestedQuery = $queryBuilder
                ->getEntityManager()
                ->getRepository($resourceClass)
                ->createQueryBuilder($nestedAlias);

            // Get the alias relation and field
            [$rAlias, $rField] = $this->addJoinsForNestedProperty($property, $nestedAlias, $nestedQuery, $queryNameGenerator, $resourceClass);

            // Primary key field
            $pkField = $this->getClassMetadata($resourceClass)->getIdentifier()[0];

            // The nested query (Adding the parameters here will fail the request)
            $nestedQuery
                ->select(sprintf("DISTINCT %s.%s", $nestedAlias, $pkField))
                ->andWhere(sprintf("%s.%s IN (:%s)", $rAlias, $rField, $valueParameter));

            $queryBuilder
                ->andWhere(
                    $queryBuilder->expr()->notIn(
                        sprintf("%s.%s", $tblAlias, $pkField),
                        $nestedQuery->getDQL()
                    )
                )
                ->setParameter($valueParameter, $values);
        } else {
            // NOT IN without any relations
            $queryBuilder
                ->andWhere(sprintf("%s.%s NOT IN (:%s)", $tblAlias, $field, $valueParameter))
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
