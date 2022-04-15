<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\UserMiController;
use App\Repository\AppUserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AppUserRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    collectionOperations: [
        "get",
        "post" => [
            "denormalization_context" => [
                "groups" => [
                    "user:create"
                ]
            ]
        ],
        "getMiself" => [
            "method" => "GET",
            "path" => "/app_user/mi",
            "controller" => UserMiController::class,
            "read" => false,
            "normalization_context" => [
                "groups" => [
                    "entity:full",
                    "user:restricted",
                    "user:extended"
                ]
            ]
        ],
    ],
    itemOperations: [
        "get",
        "patch" => [
            "security" => "object == user"
        ]
    ],
    normalizationContext: ["groups" => "user:restricted"],
)]
class AppUser extends AbstractEntity implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Column(type: "string", length: 255, unique: true)]
    #[Groups("user:restricted", "user:create")]
    private string $emailAddress;

    #[ORM\Column(type: "json")]
    #[Groups("user:extended")]
    private array $roles = [];

    #[ORM\Column(type: "string")]
    #[Groups("user:create")]
    private string $password;

    #[ORM\Column(type: "string", length: 255)]
    #[Groups("user:restricted", "user:create")]
    private string $firstName;

    #[ORM\Column(type: "string", length: 255)]
    #[Groups("user:restricted", "user:create")]
    private string $lastName;

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return $this->emailAddress;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = "ROLE_USER";

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmailAddress(): ?string
    {
        return $this->emailAddress;
    }

    public function setEmailAddress(string $emailAddress): self
    {
        $this->emailAddress = $emailAddress;

        return $this;
    }
}
