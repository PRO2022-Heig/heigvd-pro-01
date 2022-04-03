<?php

namespace App\Tests\Unit\Entity;

use App\Entity\FoodConstraint;
use App\Entity\Ingredient;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class FoodConstraintTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/
    public function testNameGetterAndSetter(): void
    {
        $testName = "test";
        $foodConstraint = $this->hydrate(FoodConstraint::class, ["name" => $testName]);
        $this->assertEquals($testName, $foodConstraint->getName(), "$testName does not match return");
    }

    public function testDescriptionGetterAndSetter(): void
    {
        $testDescription = "test";
        $foodConstraint = $this->hydrate(FoodConstraint::class, ["description" => $testDescription]);
        $this->assertEquals($testDescription, $foodConstraint->getDescription(), "$testDescription does not match return");
    }

    public function testIngredientGetterAndAdder(): void
    {
        $testIngredient = $this->hydrate(Ingredient::class, ["name" => "testIngredient"]);
        $foodConstraint = $this->hydrate(FoodConstraint::class, ["ingredient" => $testIngredient]);
        $this->assertEquals($testIngredient, $foodConstraint->getIngredients()->first(), $testIngredient->getName() . " does not match return");
    }

    public function testIngredientRemover(): void
    {
        $testIngredient = $this->hydrate(Ingredient::class, ["name" => "testIngredient"]);
        $foodConstraint = $this->hydrate(FoodConstraint::class, ["ingredient" => $testIngredient]);
        $foodConstraint->removeIngredient($testIngredient);
        $this->assertEmpty($foodConstraint->getIngredients(), $testIngredient->getName() . " has not been removed");
    }
}
