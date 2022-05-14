<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Meal\HomeMeal;
use App\Entity\Recipe;
use App\Entity\RecipeIngredient;
use App\Entity\Step;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class RecipeTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testEmptyName(): void
    {
        $recipe = $this->hydrate(Recipe::class, ["name" => "", "numberOfPeople" => 5]);
        $this->assertErrorCount(1, $recipe, "recipe name should not be blank");
    }

    public function testNegativeNumberOfPeople(): void
    {
        $recipe = $this->hydrate(Recipe::class, ["name" => "name", "numberOfPeople" => -5]);
        $this->assertErrorCount(1, $recipe, "recipe can not be for a negative number of people");
    }

    public function testZeroNumberOfPeople(): void
    {
        $recipe = $this->hydrate(Recipe::class, ["name" => "name", "numberOfPeople" => 0]);
        $this->assertErrorCount(1, $recipe, "recipe can not be for 0 person");
    }

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

    public function testNameGetterAndSetter(): void
    {
        $testName = "test";
        $testRecipe = $this->hydrate(Recipe::class, ["name" => $testName]);
        $this->assertEquals($testName, $testRecipe->getName(), "$testName does not match return");
    }

    public function testDescriptionGetterAndSetter(): void
    {
        $testDescription = "test";
        $testRecipe = $this->hydrate(Recipe::class, ["description" => $testDescription]);
        $this->assertEquals($testDescription, $testRecipe->getDescription(), "$testDescription does not match return");
    }

    public function testNumberOfPeopleGetterAndSetter(): void
    {
        $testNumberOfPeople = 5;
        $testRecipe = $this->hydrate(Recipe::class, ["numberOfPeople" => $testNumberOfPeople]);
        $this->assertEquals($testNumberOfPeople, $testRecipe->getNumberOfPeople(), "$testNumberOfPeople does not match return");
    }

    public function testStepsGetterAndAdder(): void
    {
        $testStep = $this->hydrate(Step::class, ["action" => "testProduct"]);
        $testRecipe = $this->hydrate(Recipe::class, ["step" => $testStep]);
        $this->assertEquals($testStep, $testRecipe->getSteps()->first(), $testStep->getAction() . " does not match return");
    }

    public function testFoodConstraintRemover(): void
    {
        $testStep = $this->hydrate(Step::class, ["action" => "testProduct"]);
        $testRecipe = $this->hydrate(Recipe::class, ["step" => $testStep]);
        $testRecipe->removeStep($testStep);
        $this->assertEmpty($testRecipe->getSteps(), $testStep->getAction() . " has not been removed");
    }

    public function testIngredientsGetterAndAdder(): void
    {
        $testIngredient = $this->hydrate(RecipeIngredient::class, ["quantity" => 1]);
        $testRecipe = $this->hydrate(Recipe::class, ["ingredient" => $testIngredient]);
        $this->assertEquals($testIngredient, $testRecipe->getIngredients()->first(), " does not match return");
    }

    public function testIngredientsRemover(): void
    {
        $testIngredient = $this->hydrate(RecipeIngredient::class, ["quantity" => 1]);
        $testRecipe = $this->hydrate(Recipe::class, ["ingredient" => $testIngredient]);
        $testRecipe->removeIngredient($testIngredient);
        $this->assertEmpty($testRecipe->getIngredients(), " has not been removed");
    }


    public function testMealsGetterAndAdder(): void
    {
        $testMeal = $this->hydrate(HomeMeal::class, ["name" => "hello"]);
        $testRecipe = $this->hydrate(Recipe::class, ["meal" => $testMeal]);
        $this->assertEquals($testMeal, $testRecipe->getMeals()->first(), " does not match return");
    }

    public function testMealsRemover(): void
    {
        $testMeal = $this->hydrate(HomeMeal::class, ["name" => "hello"]);
        $testRecipe = $this->hydrate(Recipe::class, ["meals" => $testMeal]);
        $testRecipe->removeMeal($testMeal);
        $this->assertEmpty($testRecipe->getMeals(), " has not been removed");
    }
}
