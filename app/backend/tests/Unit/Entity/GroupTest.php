<?php

namespace App\Tests\Unit\Entity;

use App\Entity\AppUser;
use App\Entity\Event;
use App\Entity\Group;
use App\Entity\GroupUserMembership;
use Doctrine\Common\Collections\ArrayCollection;
use ReflectionProperty;
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

    public function testEvents(): void
    {
        $group = $this->hydrate(Group::class, ["name" => "simon's back-door"]);
        $event = $this->hydrate(Event::class, ["group" => $group]);
        $group->addEvent($event);
        $this->assertContains($event, $group->getEvents());
        $group->removeEvent($event);
        $this->assertNotContains($event, $group->getEvents());
    }

    public function testIsAdmin(): void
    {
        $appUser1 = $this->hydrate(AppUser::class);
        $appUser2 = $this->hydrate(AppUser::class);

        $reflectionPropertyUser = new ReflectionProperty(AppUser::class, "id");
        $reflectionPropertyUser->setAccessible(true);
        $reflectionPropertyUser->setValue($appUser1, 12);
        $reflectionPropertyUser->setValue($appUser2, 15);

        $group = $this->hydrate(
            Group::class,
            [
                "id" => 7,
                "name" => "simon's back-door"
            ]
        );

        $memberShipAdmin = $this->hydrate(
            GroupUserMembership::class,
            ["group" => $group, "user" => $appUser1, "isAdmin" => true]
        );

        $memberShipNotAdmin = $this->hydrate(
            GroupUserMembership::class,
            ["group" => $group, "user" => $appUser2, "isAdmin" => false]
        );

        $reflectionProperty = new ReflectionProperty($group, "groupUserMemberships");
        $reflectionProperty->setAccessible(true);
        $reflectionProperty->setValue($group, new ArrayCollection([$memberShipAdmin, $memberShipNotAdmin]));
        $this->assertTrue($group->isAdmin($appUser1));
        $this->assertFalse($group->isAdmin($appUser2));
    }

    public function testConstruct(): void
    {
        $group = new Group();
        $this->assertInstanceOf(Group::class, $group);
    }
}
