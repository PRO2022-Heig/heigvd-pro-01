<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Ingredient;
use App\Entity\Step;
use App\Entity\StepIngredient;
use App\Entity\Unit;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class StepIngredientTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testNullIngredient(): void
    {
        $step = $this->hydrate(Step::class, ["action" => "action"]);
        $stepIngredient = $this->hydrate(StepIngredient::class, ["amount" => 3, "ingredient" => null, "step" => $step]);
        $this->assertErrorCount(1, $stepIngredient, "ingredient step must have an ingredient");
    }

    public function testNegativeAmount(): void
    {
        $step = $this->hydrate(Step::class, ["action" => "action"]);
        $ingredient = $this->hydrate(Ingredient::class, ["name" => "name"]);
        $stepIngredient = $this->hydrate(StepIngredient::class, ["amount" => -5, "ingredient" => $ingredient, "step" => $step]);
        $this->assertErrorCount(1, $stepIngredient, "step ingredient amount must be positive");
    }

    public function testZeroAmount(): void
    {
        $step = $this->hydrate(Step::class, ["action" => "action"]);
        $ingredient = $this->hydrate(Ingredient::class, ["name" => "name"]);
        $stepIngredient = $this->hydrate(StepIngredient::class, ["amount" => 0, "ingredient" => $ingredient, "step" => $step]);
        $this->assertErrorCount(1, $stepIngredient, "step ingredient amount must be greater than 0");
    }

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

    public function testAmountGetterAndSetter(): void
    {
        $amount = 5.0;
        $ingredientStep = $this->hydrate(StepIngredient::class, ["amount" => $amount]);
        $this->assertEquals($amount, $ingredientStep->getAmount(), "$amount does not match return");
    }

    public function testStepGetterAndSetter(): void
    {
        $step = $this->hydrate(Step::class, ["action" => "test action"]);
        $ingredientStep = $this->hydrate(StepIngredient::class, ["step" => $step]);
        $this->assertEquals($step, $ingredientStep->getStep(), $step->getAction() . " does not match return");
    }

    public function testIngredientGetterAndSetter(): void
    {
        $ingredient = $this->hydrate(Ingredient::class, ["name" => "test name"]);
        $ingredientStep = $this->hydrate(StepIngredient::class, ["ingredient" => $ingredient]);
        $this->assertEquals($ingredient, $ingredientStep->getIngredient(), $ingredient->getName() . " does not match return");
    }

    public function testUnitGetterAndSetter(): void
    {
        $unit = $this->hydrate(Unit::class, ["name" => "test name"]);
        $ingredientStep = $this->hydrate(StepIngredient::class, ["unit" => $unit]);
        $this->assertEquals($unit, $ingredientStep->getUnit(), $unit->getName() . " does not match return");
    }
}
