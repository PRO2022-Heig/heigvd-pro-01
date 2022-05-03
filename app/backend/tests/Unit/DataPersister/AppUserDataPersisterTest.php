<?php

namespace App\Tests\Unit\DataPersister;

use ApiPlatform\Core\Exception\InvalidArgumentException;
use App\CustomException\PasswordDoesNotMatchRequirementsException;
use App\DataPersisters\AppUserDataPersister;
use App\Entity\AppUser;
use App\Entity\Ingredient;
use App\Repository\AppUserRepository;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\MockObject\MockObject;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppUserDataPersisterTest extends KernelTestCase
{
    private ?AppUserDataPersister $dataPersister;
    private AppUserRepository $appUserRepository;
    private MockObject $manager;
    private MockObject $hasher;

    protected function setUp(): void
    {
        parent::setUp();

        $this->manager = $this->getMockBuilder(EntityManagerInterface::class)->getMock();
        $this->hasher = $this->getMockBuilder(UserPasswordHasherInterface::class)->getMock();
        $this->appUserRepository = $this
            ->getMockBuilder(AppUserRepository::class)
            ->disableOriginalConstructor()
            ->getMock();
        $this->appUserRepository->method("findBy")->willReturn([]);

        $this->dataPersister = new AppUserDataPersister($this->manager, $this->hasher, $this->appUserRepository);
    }

    public function testSupports(): void
    {
        $this->assertTrue($this->dataPersister->supports(new AppUser()), "AppUser should be valid");
        $this->assertFalse($this->dataPersister->supports(new Ingredient()), "Ingredient should not be valid");
    }

    public function testPersist(): void
    {
        $userMock = $this->getMockBuilder(AppUser::class)->getMock();
        $userMock->setPassword("1Q£!tqzdh");

        $this->manager->expects($this->once())->method("persist");
        $this->manager->expects($this->once())->method("flush");

        $this->hasher
            ->expects($this->once())
            ->method("hashPassword")
            ->will($this->returnValue("1Q£!tqzdh"));

        $userMock->expects($this->once())->method("getPassword")->willReturn("1Q£!tqzdh");

        $userMock->expects($this->once())->method("setPassword")->with("1Q£!tqzdh");

        $this->dataPersister->persist($userMock);
    }

    public function testPasswordCriteria(): void
    {
        $appUser = new AppUser();
        $appUser->setEmailAddress("toto@mercedes.com"); // Required in order to get the persister to work

        $passwords = [
            ["abcdeffq", false],
            ["1aetqzdh", false],
            ["1Qetqzdh", false],
            ["1Q\$tqzd", false],
            ["1Q\$TQZDH", false],
            ["1Q\$tQZDH", true],
        ];

        foreach ($passwords as $password) {
            $appUser->setPassword($password[0]);
            $passedValidation = true;
            try {
                $this->dataPersister->persist($appUser);
            } catch (PasswordDoesNotMatchRequirementsException) {
                $passedValidation = false;
            }

            $this->assertEquals($password[1], $passedValidation);
        }
    }

    public function testEmailDuplicateChecker()
    {
        // We have to redefine it here since we want to change the behaviour of the repository
        // This could be another test case given that we need different behaviours but they do test the same thing
        // underneath so better keep it in one place
        $this->appUserRepository = $this
            ->getMockBuilder(AppUserRepository::class)
            ->disableOriginalConstructor()
            ->getMock();
        $this->appUserRepository->method("findBy")->willReturn([""]);

        $this->dataPersister = new AppUserDataPersister($this->manager, $this->hasher, $this->appUserRepository);

        $appUser = new AppUser();
        $appUser->setEmailAddress("luis@mercedes.com");
        $appUser->setPassword("1Q\$tQZDH");

//        $this->appUserRepository->method("findBy")->willReturn();

        $this->expectException(InvalidArgumentException::class);

        $this->dataPersister->persist($appUser);
    }

    public function testRemove(): void
    {
        $this->manager->expects($this->once())->method("remove");
        $this->manager->expects($this->once())->method("flush");

        $this->dataPersister->remove(new AppUser());
    }
}
