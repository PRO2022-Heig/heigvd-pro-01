<?php

namespace App\Tests\Unit\Entity;

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
}
