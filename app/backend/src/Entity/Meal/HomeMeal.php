<?php

namespace App\Entity\Meal;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Meal;
use App\Entity\Recipe;
use App\Repository\Meal\HomeMealRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: HomeMealRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource]
class HomeMeal extends Meal
{
    #[ORM\ManyToMany(targetEntity: Recipe::class)]
    private Collection $recipes;

    public function __construct()
    {
        $this->recipes = new ArrayCollection();
    }

    /**
     * @return Collection<int, Recipe>
     */
    public function getRecipes(): Collection
    {
        return $this->recipes;
    }

    public function addRecipe(Recipe $recipe): self
    {
        if (!$this->recipes->contains($recipe)) {
            $this->recipes[] = $recipe;
        }

        return $this;
    }

    public function removeRecipe(Recipe $recipe): self
    {
        $this->recipes->removeElement($recipe);

        return $this;
    }
}