<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EventRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: EventRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource]
class Event extends AbstractEntity
{
    #[ORM\Column(type: "string", length: 255)]
    #[Assert\NotBlank]
    private string $name;

    #[ORM\Column(type: "text", nullable: true)]
    private ?string $description;

    #[ORM\ManyToOne(targetEntity: Meal::class)]
    private Meal $meal;

    #[ORM\ManyToOne(targetEntity: Group::class, inversedBy: "events")]
    #[ORM\JoinColumn(nullable: false)]
    private Group $group;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getMeal(): ?Meal
    {
        return $this->meal;
    }

    public function setMeal(?Meal $meal): self
    {
        $this->meal = $meal;

        return $this;
    }

    public function getGroup(): ?Group
    {
        return $this->group;
    }

    public function setGroup(?Group $group): self
    {
        $this->group = $group;

        return $this;
    }
}
