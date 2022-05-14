<?php

namespace App\DataFixtures;

use App\Entity\Ingredient;
use Doctrine\Persistence\ObjectManager;

class IngredientFixture extends AbstractDataImportFixture
{
    protected const JSON_FILE = "ingredients__product_codes_filtered.json";

    public function load(ObjectManager $manager)
    {
        $data = $this->getJsonData(mandatoryFields: ["ingredient", "products"]);

        foreach ($data as $key => $item) {
            $ingredient = new Ingredient();
            $ingredient->setName($item["ingredient"]);

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
}
