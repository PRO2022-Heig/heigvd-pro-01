<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\GroupRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\NotBlank;

#[ORM\Entity(repositoryClass: GroupRepository::class)]
#[ORM\Table(name: "`group`")] // See comments of this answer: https://stackoverflow.com/a/10483663/6086785
#[ORM\HasLifecycleCallbacks]
#[ApiResource]
class Group extends AbstractEntity
{
    #[ORM\Column(type: "string", length: 255)]
    #[NotBlank]
    private string $name;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }
}
