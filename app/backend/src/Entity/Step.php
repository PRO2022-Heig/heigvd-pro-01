<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\StepRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: StepRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource]
class Step extends AbstractEntity
{
    #[ORM\Column(type: "text")]
    #[Assert\NotBlank]
    private string $action;

    #[ORM\Column(type: "integer")]
    private int $number;

    #[ORM\ManyToOne(targetEntity: Recipe::class, inversedBy: "steps")]
    #[ORM\JoinColumn(nullable: false)]
    private ?Recipe $recipe;

    public function getAction(): ?string
    {
        return $this->action;
    }

    public function setAction(string $action): self
    {
        $this->action = $action;

        return $this;
    }

    public function getNumber(): ?int
    {
        return $this->number;
    }

    public function setNumber(int $number): self
    {
        $this->number = $number;

        return $this;
    }

    public function getRecipe(): ?Recipe
    {
        return $this->recipe;
    }

    public function setRecipe(?Recipe $recipe): self
    {
        $this->recipe = $recipe;

        return $this;
    }
}
