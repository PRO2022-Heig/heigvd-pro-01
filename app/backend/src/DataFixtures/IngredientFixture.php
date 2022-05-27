<?php

namespace App\DataFixtures;

use App\Entity\Ingredient;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use function array_rand;

class IngredientFixture extends AbstractDataImportFixture implements DependentFixtureInterface
{
    protected const JSON_FILE = "ingredients__product_codes_filtered.json";

    public function load(ObjectManager $manager)
    {
        $data = $this->getJsonData(mandatoryFields: ["ingredient", "products"]);

        $constraints = [
            "fr:Glute",
            "fr:amandon",
            "fr:oursin"
        ];
        foreach ($data as $key => $item) {
            $ingredient = new Ingredient();
            $ingredient
                ->setName($item["ingredient"])
                ->addFoodConstraint($this->getReference("allergen-" . $constraints[array_rand($constraints)]));

            $manager->persist($ingredient);
            $this->addReference("ingredient-" . $key, $ingredient);
            foreach ($item["products"] as $product) {
                foreach ($product["codes"] as $code) {
                    if (!$this->hasReference("ingredient-product-" . $code)) {
                        $this->addReference("ingredient-product-" . $code, $ingredient);
                    }
                }
            }
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            FoodConstraintFixture::class
        ];
    }
}
