<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Restaurant;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class RestaurantTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testEmptyName(): void
    {
        $restaurant = new Restaurant();
        $this->assertErrorCount(1, $restaurant->setName(""), "Restaurant name can not be empty");
    }

    public function testNameGetterAndSetter(): void
    {
        $testName = "test";
        $restaurant = new Restaurant();
        $restaurant->setName($testName);
        $this->assertEquals($testName, $restaurant->getName(), "$testName does not match return");
    }

    public function testDescriptionGetterAndSetter(): void
    {
        $testDescription = "test";
        $restaurant = new Restaurant();
        $restaurant->setDescription($testDescription);
        $this->assertEquals($testDescription, $restaurant->getDescription(), "$testDescription does not match return");
    }

    public function testLocationGetterAndSetter(): void
    {
        $testLocation = "test";
        $restaurant = new Restaurant();
        $restaurant->setLocation($testLocation);
        $this->assertEquals($testLocation, $restaurant->getLocation(), "$testLocation does not match return");
    }
}
