<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Group;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class GroupTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testEmptyName(): void
    {
        $foodConstraint = $this->hydrate(Group::class, ["name" => ""]);
        $this->assertErrorCount(1, $foodConstraint, "name should not be blank");
    }

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

    public function testNameGetterAndSetter(): void
    {
        $testName = "test";
        $foodConstraint = $this->hydrate(Group::class, ["name" => $testName]);
        $this->assertEquals($testName, $foodConstraint->getName(), "$testName does not match return");
    }
}
