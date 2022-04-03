<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Recipe;
use App\Entity\Step;
use App\Entity\StepIngredient;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class StepTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testActionGetterAndSetter(): void
    {
        $testAction = "test";
        $step = $this->hydrate(Step::class, ["action" => $testAction]);
        $this->assertEquals($testAction, $step->getAction(), "$testAction does not match return");
    }

    public function testNumberGetterAndSetter(): void
    {
        $recipeNumber = 5;
        $testRecipe = $this->hydrate(Step::class, ["number" => $recipeNumber]);
        $this->assertEquals($recipeNumber, $testRecipe->getNumber(), "$recipeNumber does not match return");
    }

    public function testStepsGetterAndSetter(): void
    {
        $recipe = $this->hydrate(Recipe::class, ["name" => "testRecipe"]);
        $step = $this->hydrate(Step::class, ["recipe" => $recipe]);
        $this->assertEquals($recipe, $step->getRecipe(), $recipe->getName() . " does not match return");
    }

    public function testStepsGetterAndAdder(): void
    {
        $stepIngredients = $this->hydrate(StepIngredient::class);
        $step = $this->hydrate(Step::class, ["ingredient" => $stepIngredients]);
        $this->assertEquals($stepIngredients, $step->getIngredients()->first(), "Step ingredient does not match return");
    }

    public function testFoodConstraintRemover(): void
    {
        $stepIngredients = $this->hydrate(StepIngredient::class);
        $step = $this->hydrate(Step::class, ["ingredient" => $stepIngredients]);
        $step->removeIngredient($stepIngredients);
        $this->assertEmpty($step->getIngredients(), "Step ingredient has not been removed");
    }
}