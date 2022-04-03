<?php

namespace App\Tests\Unit\Entity\Meal;

use App\Entity\FoodConstraint;
use App\Entity\Meal\RestaurantMeal;
use App\Entity\Restaurant;
use App\Tests\Unit\Entity\EntityAssertionsTrait;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class RestaurantMealTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testNullRestaurant(): void
    {
        $meal = $this->hydrate(RestaurantMeal::class, ["name" => "name", "restaurant" => null]);
        $this->assertErrorCount(1, $meal, "meal should have a restaurant");
    }

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

    public function testStepsGetterAndSetter(): void
    {
        $restaurant = $this->hydrate(Restaurant::class, ["name" => "test restaurant"]);
        $restaurantMeal = $this->hydrate(RestaurantMeal::class, ["restaurant" => $restaurant]);
        $this->assertEquals($restaurant, $restaurantMeal->getRestaurant(), $restaurant->getName() . " does not match return");
    }

    public function testRestaurantGetterAndAdder(): void
    {
        $constraint = $this->hydrate(FoodConstraint::class, ["name" => "meal"]);
        $restaurantMeal = $this->hydrate(RestaurantMeal::class, ["foodConstraint" => $constraint]);
        $this->assertEquals($constraint, $restaurantMeal->getFoodConstraint()->first(), $constraint->getName() . " does not match return");
    }

    public function testRestaurantRemover(): void
    {
        $constraint = $this->hydrate(FoodConstraint::class, ["name" => "meal"]);
        $restaurantMeal = $this->hydrate(RestaurantMeal::class, ["foodConstraint" => $constraint]);
        $restaurantMeal->removeFoodConstraint($constraint);
        $this->assertEmpty($restaurantMeal->getFoodConstraint(), $constraint->getName() . " has not been removed");
    }
}