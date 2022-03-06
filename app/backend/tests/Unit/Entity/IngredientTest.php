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
        $this->assertErrorCount(1, $ingredient->setName(''), 'empty ingredient name');
    }
}
