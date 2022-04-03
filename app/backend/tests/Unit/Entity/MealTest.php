<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Meal;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class MealTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testEmptyName(): void
    {
        $meal = $this->hydrate(Meal::class, ["name" => ""]);
        $this->assertErrorCount(1, $meal, "meal name should not be empty");
    }

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

    public function testNameGetterAndSetter(): void
    {
        $name = "test";
        $restaurant = $this->hydrate(Meal::class, ["name" => $name]);
        $this->assertEquals($name, $restaurant->getName(), "$name does not match return");
    }

    public function testDescriptionGetterAndSetter(): void
    {
        $testDescription = "test";
        $restaurant = $this->hydrate(Meal::class, ["description" => $testDescription]);
        $this->assertEquals($testDescription, $restaurant->getDescription(), "$testDescription does not match return");
    }
}