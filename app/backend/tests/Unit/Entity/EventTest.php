<?php

namespace App\Tests\Unit\Entity;

use App\Entity\Event;
use App\Entity\Meal;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class EventTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testEmptyName(): void
    {
        $event = $this->hydrate(Event::class, ["name" => ""]);
        $this->assertErrorCount(1, $event, "event name should not be blank");
    }

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

    public function testNameGetterAndSetter(): void
    {
        $testName = "test";
        $event = $this->hydrate(Event::class, ["name" => $testName]);
        $this->assertEquals($testName, $event->getName(), "$testName does not match return");
    }

    public function testDescriptionGetterAndSetter(): void
    {
        $testDescription = "test";
        $event = $this->hydrate(Event::class, ["description" => $testDescription]);
        $this->assertEquals($testDescription, $event->getDescription(), "$testDescription does not match return");
    }

    public function testMealGetterAndSetter(): void
    {
        $meal = $this->hydrate(Meal::class, ["name" => "meal"]);
        $event = $this->hydrate(Event::class, ["meal" => $meal]);
        $this->assertEquals($meal, $event->getMeal(), $meal->getName() . " does not match return");
    }
}