<?php

namespace App\DataPersisters;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\CustomException\EmailDuplicateException;
use App\CustomException\PasswordDoesNotMatchRequirementsException;
use App\Entity\AppUser;
use App\Repository\AppUserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class AppUserDataPersister implements ContextAwareDataPersisterInterface
{
    private EntityManagerInterface $manager;
    private UserPasswordHasherInterface $passwordHasher;
    private AppUserRepository $appUserRepository;

    public function __construct(
        EntityManagerInterface $manager,
        UserPasswordHasherInterface $passwordHasher,
        AppUserRepository $appUserRepository
    ) {
        $this->manager = $manager;
        $this->passwordHasher = $passwordHasher;
        $this->appUserRepository = $appUserRepository;
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
        $minLowercase = 1;
        $minLength = 8;

        $actualDigits = 0;
        $actualSpecial = 0;
        $actualUppercase = 0;
        $actualLowercase = 0;

        foreach (str_split($password) as $char) {
            if (ctype_digit($char)) {
                ++$actualDigits;
            } elseif (ctype_upper($char)) {
                ++$actualUppercase;
            } elseif (ctype_lower($char)) {
                ++$actualLowercase;
            } elseif (!ctype_alnum($char)) {
                ++$actualSpecial;
            }
        }

        if (
            strlen($password) < $minLength
            || $actualDigits < $minDigits
            || $actualSpecial < $minSpecial
            || $actualUppercase < $minUppercase
            || $actualLowercase < $minLowercase
        ) {
            throw new PasswordDoesNotMatchRequirementsException();
        }

        // If it is a new user, checking that the e-mail does not already exist
        if ($data->getId() === null) {
            if (count($this->appUserRepository->findBy(["emailAddress" => $data->getEmailAddress()])) > 0) {
                throw new EmailDuplicateException();
            }
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
