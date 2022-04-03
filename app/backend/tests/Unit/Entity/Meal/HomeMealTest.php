<?php

namespace App\Tests\Unit\Entity\Meal;

use App\Entity\Meal\HomeMeal;
use App\Entity\Recipe;
use App\Tests\Unit\Entity\EntityAssertionsTrait;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class HomeMealTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

    public function testStepsGetterAndAdder(): void
    {
        $recipe = $this->hydrate(Recipe::class, ["name" => "test recipe"]);
        $homeMeal = $this->hydrate(HomeMeal::class, ["recipe" => $recipe]);
        $this->assertEquals($recipe, $homeMeal->getRecipes()->first(), $recipe->getName() . " does not match return");
    }

    public function testFoodConstraintRemover(): void
    {
        $recipe = $this->hydrate(Recipe::class, ["name" => "test recipe"]);
        $homeMeal = $this->hydrate(HomeMeal::class, ["recipe" => $recipe]);
        $homeMeal->removeRecipe($recipe);
        $this->assertEmpty($homeMeal->getRecipes(), $recipe->getName() . " has not been removed");
    }
}