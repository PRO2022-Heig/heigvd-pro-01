<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Ingredient;
use App\Entity\Product;
use App\Entity\Provider;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class ProductTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testEmptyName(): void
    {
        $product = $this->hydrate(Product::class, ["name" => "", "reference" => "not blank"]);
        $this->assertErrorCount(1, $product, "product name should not be blank");
    }

    public function testEmptyReference(): void
    {
        $product = $this->hydrate(Product::class, ["name" => "name", "reference" => ""]);
        $this->assertErrorCount(1, $product, "product reference should not be blank");
    }

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

    public function testNameGetterAndSetter(): void
    {
        $testName = "test";
        $product = $this->hydrate(Product::class, ["name" => $testName]);
        $this->assertEquals($testName, $product->getName(), "$testName does not match return");
    }

    public function testDescriptionGetterAndSetter(): void
    {
        $testDescription = "test";
        $product = $this->hydrate(Product::class, ["description" => $testDescription]);
        $this->assertEquals($testDescription, $product->getDescription(), "$testDescription does not match return");
    }

    public function testReferenceGetterAndSetter(): void
    {
        $testReference = "test";
        $product = $this->hydrate(Product::class, ["reference" => $testReference]);
        $this->assertEquals($testReference, $product->getReference(), "$testReference does not match return");
    }

    public function testIngredientGetterAndSetter(): void
    {
        $testIngredient = $this->hydrate(Ingredient::class, ["name" => "test ingredient"]);
        $product = $this->hydrate(Product::class, ["ingredient" => $testIngredient]);
        $this->assertEquals($testIngredient, $product->getIngredient(), $testIngredient->getName() . " does not match return");
    }

    public function testProviderGetterAndSetter(): void
    {
        $testProvider = $this->hydrate(Provider::class, ["name" => "test ingredient"]);
        $product = $this->hydrate(Product::class, ["provider" => $testProvider]);
        $this->assertEquals($testProvider, $product->getProvider(), $testProvider->getName() . " does not match return");
    }
}
