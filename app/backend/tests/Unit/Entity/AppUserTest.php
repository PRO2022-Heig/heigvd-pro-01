<?php

namespace App\Tests\Unit\Entity;

use App\Entity\AppUser;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class AppUserTest extends KernelTestCase
{
    use EntityAssertionsTrait;

    public function testEmptyEmail(): void
    {
        $appUser = $this->hydrate(AppUser::class, ["emailAddress" => ""]);
        $this->assertErrorCount(1, $appUser, "user email should not be blank");
    }

    /*****************************************************************************************************************
     * GETTER, SETTER, ADDER, REMOVER
     ****************************************************************************************************************/

    public function testEmailGetterAndSetter(): void
    {
        $testValue = "test";
        $appUser = $this->hydrate(AppUser::class, ["emailAddress" => $testValue]);
        $this->assertEquals($testValue, $appUser->getEmailAddress(), "$testValue does not match return");
    }

    public function testUserIdentifierGetter(): void
    {
        $testValue = "test";
        $appUser = $this->hydrate(AppUser::class, ["emailAddress" => $testValue]);
        $this->assertEquals($testValue, $appUser->getUserIdentifier(), "$testValue does not match return");
    }

    public function testRoleGetterAndSetter(): void
    {
        $testValue = ["test"];
        $expectedValue = array_merge($testValue, ["ROLE_USER"]);
        $appUser = $this->hydrate(AppUser::class, ["roles" => $testValue]);
        $this->assertEquals($expectedValue, $appUser->getRoles(), "Roles array does not match return");
    }

    public function testPasswordGetterAndSetter(): void
    {
        $testValue = "test";
        $appUser = $this->hydrate(AppUser::class, ["password" => $testValue]);
        $this->assertEquals($testValue, $appUser->getPassword(), "$testValue does not match return");
    }

    public function testEraseCredentials(): void
    {
        $appUser = $this->hydrate(AppUser::class, []);
        $this->assertNull($appUser->eraseCredentials());
    }

    public function testFirstNameGetterAndSetter(): void
    {
        $testValue = "John";
        $appUser = $this->hydrate(AppUser::class, ["firstName" => $testValue]);
        $this->assertEquals($testValue, $appUser->getFirstName(), "$testValue does not match return");
    }

    public function testLastNameGetterAndSetter(): void
    {
        $testValue = "Doe";
        $appUser = $this->hydrate(AppUser::class, ["lastName" => $testValue]);
        $this->assertEquals($testValue, $appUser->getLastName(), "$testValue does not match return");
    }
}
