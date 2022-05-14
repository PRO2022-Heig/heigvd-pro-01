<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Ingredient;
use App\Entity\Recipe;
use App\Entity\RecipeIngredient;
use App\Entity\Unit;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class RecipeIngredientTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

    public function testQuantityGetterAndSetter(): void
    {
        $testQuantity = 3;
        $foodConstraint = $this->hydrate(RecipeIngredient::class, ["quantity" => $testQuantity]);
        $this->assertEquals($testQuantity, $foodConstraint->getQuantity(), "$testQuantity does not match return");
    }

    public function testIngredientGetterAndSetter(): void
    {
        $testIngredient = $this->hydrate(Ingredient::class, ["name" => "testIngredient"]);
        $recipeIngredient = $this->hydrate(RecipeIngredient::class, ["ingredient" => $testIngredient]);
        $this->assertEquals($testIngredient, $recipeIngredient->getIngredient(), $testIngredient->getName() . " does not match return");
    }

    public function testRecipeGetterAndSetter(): void
    {
        $testRecipe = $this->hydrate(Recipe::class, ["name" => "testIngredient"]);
        $recipeIngredient = $this->hydrate(RecipeIngredient::class, ["recipe" => $testRecipe]);
        $this->assertEquals($testRecipe, $recipeIngredient->getRecipe(), $testRecipe->getName() . " does not match return");
    }

    public function testUnitGetterAndSetter(): void
    {
        $testUnit = $this->hydrate(Unit::class, ["name" => "testUnit", "type" => "undefined"]);
        $recipeIngredient = $this->hydrate(RecipeIngredient::class, ["unit" => $testUnit]);
        $this->assertEquals($testUnit, $recipeIngredient->getUnit(), $testUnit->getName() . " does not match return");
    }
}
