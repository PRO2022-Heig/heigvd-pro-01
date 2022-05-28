<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Recipe;
use App\Entity\Step;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class StepTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testEmptyAction(): void
    {
        $step = $this->hydrate(Step::class, ["action" => ""]);
        $this->assertErrorCount(1, $step, "step action should not be blank");
    }

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

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
}
