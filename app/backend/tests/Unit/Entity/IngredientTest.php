<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Ingredient;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class IngredientTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testEmptyName(): void
    {
        $ingredient = $this->hydrate(Ingredient::class, ["name" => ""]);
        $this->assertErrorCount(1, $ingredient, "empty ingredient name");
    }

    public function testNameGetterAndSetter(): void
    {
        $testName = "test";
        $ingredient = $this->hydrate(Ingredient::class, ["name" => $testName]);
        $this->assertEquals($testName, $ingredient->getName(), "$testName does not match return");
    }
}
