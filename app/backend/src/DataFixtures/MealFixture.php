<?php

namespace App\DataFixtures;

use App\Entity\Meal\HomeMeal;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class MealFixture extends AbstractDataImportFixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $homeMeal = new HomeMeal();
        $homeMeal
            ->addRecipe($this->getReference("recipe-0"))
            ->setName("test home meal");

        $manager->persist($homeMeal);

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            RecipeFixture::class
        ];
    }
}
