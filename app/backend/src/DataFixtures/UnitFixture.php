<?php

namespace App\DataFixtures;

use App\Entity\Unit;
use Doctrine\Persistence\ObjectManager;
use function trim;

class UnitFixture extends AbstractDataImportFixture
{
    protected const JSON_FILE = "recipes.json";

    public function load(ObjectManager $manager): void
    {
        $data = $this->getJsonData(mandatoryFields: ["ingredients"]);

        $undefinedUnit = new Unit();
        $undefinedUnit
            ->setType("undefined")
            ->setName("unité(s)");

        $this->addReference("unit-undefined", $undefinedUnit);
        $manager->persist($undefinedUnit);

        foreach ($data as $recipe) {
            foreach ($recipe["ingredients"] as $ingredient) {
                $unitName = trim($ingredient["unit"]);
                if (empty($unitName)) {
                    continue;
                }
                if ($this->hasReference("unit-" . $unitName)) {
                    continue;
                }
                $unit = new Unit();

                $unit->setName($unitName)->setType("undefined");
                $this->addReference("unit-" . $unitName, $unit);
                $manager->persist($unit);
            }
        }

        $manager->flush();
    }
}
