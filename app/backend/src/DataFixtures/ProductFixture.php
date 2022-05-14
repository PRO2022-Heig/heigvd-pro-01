<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ProductFixture extends AbstractDataImportFixture implements DependentFixtureInterface
{
    protected const CSV_FILE = "openfoodfacts_ch.csv";

    public function load(ObjectManager $manager): void
    {
        $products = $this->getCsvData(mandatoryFields: ["product_name", "ingredients_tags", "code", "image_url"]);

        foreach ($products as $p) {
            $product = new Product();
            $product
                ->setName($p["product_name"])
                ->setImageUrl($p["image_url"])
                ->setReference($p["code"]);

            $allergensArray = array_filter(explode(",", $p["allergens"]));
            foreach ($allergensArray as $allergen) {
                if ($this->hasReference("allergen-" . $allergen)) {
                    $product->addFoodConstraint($this->getReference("allergen-" . $allergen));
                }
            }

            // Product is ignored if no ingredient is related
            if (!$this->hasReference("ingredient-product-" . $p["code"])) {
                $this->logger->debug("product: " . $product->getName() . " was not imported no ingredients were linked to it");
                continue;
            }

            $product->setIngredient($this->getReference("ingredient-product-" . $p["code"]));
            $product->setProvider($this->getReference("dummy-provider"));

            $manager->persist($product);
            $this->logger->debug("product: " . $product->getName() . " persisted");
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            FoodConstraintFixture::class,
            IngredientFixture::class,
            ProviderFixture::class
        ];
    }
}
