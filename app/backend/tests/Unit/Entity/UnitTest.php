<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Unit;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class UnitTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/
    public function testUnValidUnitType(): void
    {
        $type = "custom";
        $unit = $this->hydrate(Unit::class, ["type" => $type]);
        $this->assertErrorCount(1, $unit, "$type should not be a valid unit type");
    }

    public function testValidType(): void
    {
        $type = Unit::getUnitTypes()[0];
        $unit = $this->hydrate(Unit::class, ["type" => $type]);
        $this->assertErrorCount(0, $unit, "$type should be a valid type");
    }

    public function testNameGetterAndSetter(): void
    {
        $testName = "test";
        $unit = $this->hydrate(Unit::class, ["name" => $testName]);
        $this->assertEquals($testName, $unit->getName(), "$testName does not match return");
    }

    public function testTypeGetterAndSetter(): void
    {
        $type = "test";
        $unit = $this->hydrate(Unit::class, ["type" => $type]);
        $this->assertEquals($type, $unit->getType(), "$type does not match return");
    }
}