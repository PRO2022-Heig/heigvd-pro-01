<?php

namespace App\DataFixtures;

use App\Entity\FoodConstraint;
use Doctrine\Persistence\ObjectManager;

class FoodConstraintFixture extends AbstractDataImportFixture
{
    protected const CSV_FILE = "allergens_filtered.csv";

    public function load(ObjectManager $manager): void
    {
        $data = $this->getCsvData(mandatoryFields: ["name", "tag"]);

        foreach ($data as $allergy) {
            $constraint = new FoodConstraint();
            $constraint->setName($allergy["name"]);
            $manager->persist($constraint);
            $this->addReference("allergen-" . $allergy["tag"], $constraint);
        }

        $manager->flush();
    }
}
