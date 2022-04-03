<?php

namespace App\Tests\Unit\Entity;

use App\Entity\FoodConstraint;
use App\Entity\Ingredient;
use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class IngredientTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testEmptyName(): void
    {
        $ingredient = $this->hydrate(Ingredient::class, ["name" => ""]);
        $this->assertErrorCount(1, $ingredient, "empty ingredient name");
    }

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

    public function testNameGetterAndSetter(): void
    {
        $testName = "test";
        $ingredient = $this->hydrate(Ingredient::class, ["name" => $testName]);
        $this->assertEquals($testName, $ingredient->getName(), "$testName does not match return");
    }

    public function testDescriptionGetterAndSetter(): void
    {
        $testDescription = "test";
        $ingredient = $this->hydrate(Ingredient::class, ["description" => $testDescription]);
        $this->assertEquals($testDescription, $ingredient->getDescription(), "$testDescription does not match return");
    }

    public function testFoodConstraintGetterAndAdder(): void
    {
        $testFoodConstraint = $this->hydrate(FoodConstraint::class, ["name" => "testProduct"]);
        $testIngredient = $this->hydrate(Ingredient::class, ["foodConstraint" => $testFoodConstraint]);
        $this->assertEquals($testFoodConstraint, $testIngredient->getFoodConstraints()->first(), $testFoodConstraint->getName() . " does not match return");
    }

    public function testFoodConstraintRemover(): void
    {
        $testFoodConstraint = $this->hydrate(FoodConstraint::class, ["name" => "testProduct"]);
        $testIngredient = $this->hydrate(Ingredient::class, ["foodConstraint" => $testFoodConstraint]);
        $testIngredient->removeFoodConstraint($testFoodConstraint);
        $this->assertEmpty($testIngredient->getFoodConstraints(), $testFoodConstraint->getName() . " has not been removed");
    }

    public function testProductGetterAndAdder(): void
    {
        $testProduct = $this->hydrate(Product::class, ["name" => "testProduct"]);
        $testIngredient = $this->hydrate(Ingredient::class, ["product" => $testProduct]);
        $this->assertEquals($testProduct, $testIngredient->getProducts()->first(), $testProduct->getName() . " does not match return");
    }

    public function testProductRemover(): void
    {
        $testProduct = $this->hydrate(Product::class, ["name" => "testProduct"]);
        $testIngredient = $this->hydrate(Ingredient::class, ["product" => $testProduct]);
        $testIngredient->removeProduct($testProduct);
        $this->assertEmpty($testIngredient->getProducts(), $testProduct->getName() . " has not been removed");
    }
}
