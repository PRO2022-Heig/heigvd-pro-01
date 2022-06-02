<?php

namespace App\DataFixtures;

use App\Entity\Ingredient;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class IngredientFixture extends AbstractDataImportFixture implements DependentFixtureInterface
{
    protected const JSON_FILE = "ingredients__product_codes_filtered.json";

    public function load(ObjectManager $manager)
    {
        $data = $this->getJsonData(mandatoryFields: ["ingredient", "products"]);

        foreach ($data as $key => $item) {
            $ingredient = new Ingredient();
            $ingredient->setName($item["ingredient"]);

            foreach ($item["allergens"] ?? [] as $allergen) {
                $ref = "allergen-$allergen";
                if ($this->hasReference($ref)) {
                    $ingredient->addFoodConstraint($this->getReference($ref));
                }
            }

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
