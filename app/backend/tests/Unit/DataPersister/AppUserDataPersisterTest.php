<?php

namespace App\Tests\Unit\DataPersister;

use App\DataPersisters\AppUserDataPersister;
use App\Entity\AppUser;
use App\Entity\Ingredient;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\MockObject\MockObject;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppUserDataPersisterTest extends KernelTestCase
{
    private ?AppUserDataPersister $dataPersister;
    private MockObject $manager;
    private MockObject $hasher;

    protected function setUp(): void
    {
        parent::setUp();

        $this->manager = $this->getMockBuilder(EntityManagerInterface::class)->getMock();
        $this->hasher = $this->getMockBuilder(UserPasswordHasherInterface::class)->getMock();

        $this->dataPersister = new AppUserDataPersister($this->manager, $this->hasher);
    }

    public function testSupports(): void
    {
        $this->assertTrue($this->dataPersister->supports(new AppUser()), "AppUser should be valid");
        $this->assertFalse($this->dataPersister->supports(new Ingredient()), "Ingredient should not be valid");
    }

    public function testPersist(): void
    {
        $userMock = $this->getMockBuilder(AppUser::class)->getMock();
        $userMock->setPassword("1234");

        $this->manager->expects($this->once())->method("persist");
        $this->manager->expects($this->once())->method("flush");

        $this->hasher
            ->expects($this->once())
            ->method("hashPassword")
            ->will($this->returnValue("hashed"));

        $userMock->expects($this->once())->method("getPassword");
        $userMock->expects($this->once())->method("setPassword")->with("hashed");

        $this->dataPersister->persist($userMock);
    }

    public function testRemove(): void
    {
        $this->manager->expects($this->once())->method("remove");
        $this->manager->expects($this->once())->method("flush");

        $this->dataPersister->remove(new AppUser());
    }
}