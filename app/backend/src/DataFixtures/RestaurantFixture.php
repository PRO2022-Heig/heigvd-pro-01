<?php

namespace App\DataFixtures;

use App\Entity\Meal\RestaurantMeal;
use App\Entity\Restaurant;
use Doctrine\Persistence\ObjectManager;
use function json_encode;

class RestaurantFixture extends AbstractDataImportFixture
{
    protected const JSON_FILE = "restaurant.json";

    public function load(ObjectManager $manager): void
    {
        $data = $this->getJsonData(mandatoryFields: ["name", "meals", "address"]);

        foreach ($data as $item) {
            $restaurant = new Restaurant();
            $restaurant
                ->setName($item["name"])
                ->setLocation($item["address"]);

            foreach ($item["meals"] as $meal) {
                $refKey = "restaurantmeal-" . json_encode($meal);
                if ($this->hasReference($refKey)) {
                    $restaurantMeal = $this->getReference($refKey);
                } else {
                    $restaurantMeal = new RestaurantMeal();
                    $restaurantMeal
                        ->setName($meal["name"])
                        ->setDescription($meal["description"]);

                    foreach ($meal["allergens"] ?? [] as $allergen) {
                        $ref = "allergen-$allergen";
                        if ($this->hasReference($ref)) {
                            $restaurantMeal->addFoodConstraint($this->getReference($ref));
                        }
                    }

                    $this->addReference($refKey, $restaurantMeal);
                }
                $restaurant->addMeal($restaurantMeal);
            }

            $manager->persist($restaurant);
        }
        $manager->flush();
    }
}
