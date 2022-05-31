<?php

namespace App\Filters;

use ApiPlatform\Core\Bridge\Doctrine\Common\Filter\NumericFilterTrait;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractContextAwareFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\PropertyInfo\Type;

class NotInFilter extends AbstractContextAwareFilter
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
        // otherwise filter is applied to order and page as well
        if (
            !$this->isPropertyEnabled($property, $resourceClass) ||
            !$this->isPropertyMapped($property, $resourceClass)
        ) {
            return;
        }

        $parameterName = $queryNameGenerator->generateParameterName($property); // Generate a unique parameter name to avoid collisions with other filters
        $queryBuilder
            ->andWhere(sprintf('%s NOT IN (%s)', $property, $parameterName))
            ->setParameter($parameterName, $value);
    }

    public function getDescription(string $resourceClass): array
    {
        if (!$this->properties) {
            return [];
        }

        $description = [];
        foreach ($this->properties as $property => $strategy) {
            $propertyName = $this->normalizePropertyName($property);
            $filterParameterNames = [$propertyName, $propertyName . '[]'];
            foreach ($filterParameterNames as $filterParameterName) {
                $description["not_in_$property"] = [
                    "property" => $property,
                    'type' => $this->getType((string)$this->getDoctrineFieldType($property, $resourceClass)),
                    "required" => false,
                    "swagger" => [
                        "description" => "sucker",
                        "name" => "Custom name to use in the Swagger documentation",
                        "type" => "Will appear below the name in the Swagger documentation"
                    ],
                    'is_collection' => str_ends_with((string)$filterParameterName, '[]')
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
            return 'string';
        }

        if (Types::FLOAT === $doctrineType) {
            return 'float';
        }

        return 'int';
    }
}
