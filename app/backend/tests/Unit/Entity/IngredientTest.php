<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Ingredient;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class IngredientTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testEmptyName(): void
    {
        $ingredient = new Ingredient();
        $this->assertErrorCount(1, $ingredient->setName(""), "empty ingredient name");
    }

    public function testGetId(): void
    {
        $ingredient = new Ingredient();
        $this->assertEquals(0, $ingredient->getId(), "Id has problem");
    }

    public function testNameGetterAndSetter(): void
    {
        $testName = "test";
        $ingredient = new Ingredient();
        $ingredient->setName($testName);
        $this->assertEquals($testName, $ingredient->getName(), "$testName does not match return");
    }
}
