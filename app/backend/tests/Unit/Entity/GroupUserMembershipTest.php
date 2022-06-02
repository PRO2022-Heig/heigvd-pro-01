<?php

namespace App\Tests\Unit\Entity;

use App\Entity\AppUser;
use App\Entity\Group;
use App\Entity\GroupUserMembership;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class GroupUserMembershipTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

    public function testGroupGetterAndSetter(): void
    {
        $group = new Group();
        $groupUserMemberShip = $this->hydrate(GroupUserMembership::class, ["group" => $group]);
        $this->assertSame($group, $groupUserMemberShip->getGroup(), "Group does not match return");
    }

    public function testAppUserGetterAndSetter(): void
    {
        $appUser = new AppUser();
        $groupUserMemberShip = $this->hydrate(GroupUserMembership::class, ["user" => $appUser]);
        $this->assertSame($appUser, $groupUserMemberShip->getUser(), "User does not match return");
    }

    public function testIsAdminGetterAndSetter(): void
    {
        $admin = true;
        $groupUserMemberShip = $this->hydrate(GroupUserMembership::class, ["isAdmin" => $admin]);
        $this->assertEquals($admin, $groupUserMemberShip->getIsAdmin(), "Is admin does not match return");
    }
}
