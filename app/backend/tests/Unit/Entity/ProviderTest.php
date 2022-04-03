<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Product;
use App\Entity\Provider;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class ProviderTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testEmptyName(): void
    {
        $product = $this->hydrate(Provider::class, ["name" => ""]);
        $this->assertErrorCount(1, $product, "provider name should not be blank");
    }

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

    public function testNameGetterAndSetter(): void
    {
        $testName = "test";
        $product = $this->hydrate(Provider::class, ["name" => $testName]);
        $this->assertEquals($testName, $product->getName(), "$testName does not match return");
    }

    public function testDescriptionGetterAndSetter(): void
    {
        $testDescription = "test";
        $product = $this->hydrate(Provider::class, ["description" => $testDescription]);
        $this->assertEquals($testDescription, $product->getDescription(), "$testDescription does not match return");
    }

    public function testProductGetterAndAdder(): void
    {
        $testProduct = $this->hydrate(Product::class, ["name" => "testProduct"]);
        $testProvider = $this->hydrate(Provider::class, ["product" => $testProduct]);
        $this->assertEquals($testProduct, $testProvider->getProducts()->first(), $testProduct->getName() . " does not match return");
    }

    public function testProductRemover(): void
    {
        $testProduct = $this->hydrate(Product::class, ["name" => "testProduct"]);
        $testProvider = $this->hydrate(Provider::class, ["product" => $testProduct]);
        $testProvider->removeProduct($testProduct);
        $this->assertEmpty($testProvider->getProducts(), $testProduct->getName() . " has not been removed");
    }
}