<?php

namespace App\DataFixtures;

use function array_diff;
use function array_filter;
use function array_keys;
use function count;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use function fclose;
use function fgetcsv;
use function file_get_contents;
use function fopen;
use function html_entity_decode;
use InvalidArgumentException;
use function json_decode;
use Psr\Log\LoggerAwareInterface;
use Psr\Log\LoggerInterface;
use function trim;

abstract class AbstractDataImportFixture extends Fixture implements FixtureGroupInterface, LoggerAwareInterface
{
    protected const DATA_DIRECTORY = "data/import/";
    protected const CSV_FILE = "";
    protected const JSON_FILE = "";
    protected LoggerInterface $logger;

    /**
     * @param string $path
     * @param array $mandatoryFields
     * @return array
     */
    public function getCsvData(string $path = "", array $mandatoryFields = [], ?string $lineKey = null): array
    {
        if (empty($path)) {
            $path = static::CSV_FILE;
            if (empty($path)) {
                throw new InvalidArgumentException("path must not be empty");
            }
        }

        $file = fopen(static::DATA_DIRECTORY . $path, "r");
        if ($file === false) {
            return [];
        }

        $data = [];
        $columnMapping = [];
        $line = fgetcsv($file, 1000, ",");
        foreach ($line as $name) {
            $columnMapping[] = $name;
        }
        while (($line = fgetcsv($file, 1000, ",")) !== false) {
            $lineData = [];
            foreach ($line as $key => $value) {
                $lineData[$columnMapping[$key]] = trim(html_entity_decode($value));
            }
            if (AbstractDataImportFixture::hasMandatoryFields($lineData, $mandatoryFields)) {
                if ($lineKey === null) {
                    $data[] = $lineData;
                } else {
                    $data[$lineData[$lineKey]] = $lineData;
                }
            }
        }
        fclose($file);

        return $data;
    }

    /**
     * @param string $path
     * @param array $mandatoryFields
     * @return array
     */
    public function getJsonData(string $path = "", array $mandatoryFields = []): array
    {
        if (empty($path)) {
            $path = static::JSON_FILE;
            if (empty($path)) {
                throw new InvalidArgumentException("path must not be empty");
            }
        }

        $fileContent = file_get_contents(static::DATA_DIRECTORY . $path);
        return array_filter(json_decode($fileContent, true), static function ($item) use ($mandatoryFields) {
            return AbstractDataImportFixture::hasMandatoryFields($item, $mandatoryFields);
        });
    }

    private static function hasMandatoryFields(array $array, array $mandatoryFields): bool
    {
        return count(array_diff($mandatoryFields, array_keys($array))) == 0;
    }

    /**
     * @inheritDoc
     */
    public static function getGroups(): array
    {
        return [
            "data-import"
        ];
    }

    public function setLogger(LoggerInterface $logger): void
    {
        $this->logger = $logger;
    }
}
