<?php

namespace App\DataFixtures;

use App\Entity\AppUser;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixture extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    /**
     * @param \Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface $passwordHasher
     */
    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager)
    {
        $user = (new AppUser())
            ->setFirstName("John")
            ->setLastName("Doe")
            ->setEmailAddress(static::getDefaultEmail())
            ->setSource(AppUser::SOURCE_SIGNUP);

        $plaintextPassword = static::getDefaultPassword();

        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setPassword($hashedPassword);
        $manager->persist($user);
        $manager->flush();
    }

    public static function getDefaultEmail(): string
    {
        return "john.doe@fake.com";
    }

    public static function getDefaultPassword(): string
    {
        return "supersecurepassword123";
    }
}
