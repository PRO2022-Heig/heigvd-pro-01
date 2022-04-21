<?php

namespace App\DataPersisters;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\CustomException\PasswordDoesNotMatchRequirementsException;
use App\Entity\AppUser;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class AppUserDataPersister implements ContextAwareDataPersisterInterface
{
    private EntityManagerInterface $manager;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(EntityManagerInterface $manager, UserPasswordHasherInterface $passwordHasher)
    {
        $this->manager = $manager;
        $this->passwordHasher = $passwordHasher;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof AppUser;
    }

    public function persist($data, array $context = [])
    {
        $password = $data->getPassword();

        $minDigits = 1;
        $minSpecial = 1;
        $minUppercase = 1;
        $minLength = 8;

        $actualDigits = 0;
        $actualSpecial = 0;
        $actualUppercase = 0;

        foreach (str_split($password) as $char) {
            if (ctype_digit($char)) {
                ++$actualDigits;
            } elseif (ctype_upper($char)) {
                ++$actualUppercase;
            } elseif (!ctype_alnum($char)) {
                ++$actualSpecial;
            }
        }

        if (
            strlen($password) < $minLength
            || $actualDigits < $minDigits
            || $actualSpecial < $minSpecial
            || $actualUppercase < $minUppercase
        ) {
            throw new PasswordDoesNotMatchRequirementsException();
        }

        $data->setPassword($this->passwordHasher->hashPassword($data, $password));
        $this->manager->persist($data);
        $this->manager->flush();
    }

    public function remove($data, array $context = [])
    {
        $this->manager->remove($data);
        $this->manager->flush();
    }
}
