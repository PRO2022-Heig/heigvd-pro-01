<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Meal\RestaurantMeal;
use App\Entity\Restaurant;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class RestaurantTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testEmptyName(): void
    {
        $restaurant = $this->hydrate(Restaurant::class, ["name" => ""]);
        $this->assertErrorCount(1, $restaurant, "Restaurant name can not be empty");
    }

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

    public function testNameGetterAndSetter(): void
    {
        $testName = "test";
        $restaurant = $this->hydrate(Restaurant::class, ["name" => $testName]);
        $this->assertEquals($testName, $restaurant->getName(), "$testName does not match return");
    }

    public function testDescriptionGetterAndSetter(): void
    {
        $testDescription = "test";
        $restaurant = $this->hydrate(Restaurant::class, ["description" => $testDescription]);
        $this->assertEquals($testDescription, $restaurant->getDescription(), "$testDescription does not match return");
    }

    public function testLocationGetterAndSetter(): void
    {
        $testLocation = "test";
        $restaurant = $this->hydrate(Restaurant::class, ["location" => $testLocation]);
        $this->assertEquals($testLocation, $restaurant->getLocation(), "$testLocation does not match return");
    }

    public function testStepsGetterAndAdder(): void
    {
        $meal = $this->hydrate(RestaurantMeal::class, ["name" => "testProduct"]);
        $restaurant = $this->hydrate(Restaurant::class, ["meal" => $meal]);
        $this->assertEquals($meal, $restaurant->getMeals()->first(), $meal->getName() . " does not match return");
    }

    public function testFoodConstraintRemover(): void
    {
        $meal = $this->hydrate(RestaurantMeal::class, ["name" => "testProduct"]);
        $restaurant = $this->hydrate(Restaurant::class, ["meal" => $meal]);
        $restaurant->removeMeal($meal);
        $this->assertEmpty($restaurant->getMeals(), $meal->getName() . " has not been removed");
    }
}
