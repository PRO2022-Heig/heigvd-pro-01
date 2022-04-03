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