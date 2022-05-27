<?php

namespace App\Entity\Meal;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\NumericFilter;
use App\Entity\Meal;
use App\Entity\Recipe;
use App\Repository\Meal\HomeMealRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: HomeMealRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource]
#[ApiFilter(
    NumericFilter::class,
    properties: [
        "recipes.ingredients.ingredient.foodConstraints.id",
        "recipe.duration",
        "recipe.numberOfPeople"
    ]
)]
class HomeMeal extends Meal
{
    #[ORM\ManyToMany(targetEntity: Recipe::class, mappedBy: "meals")]
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
            $recipe->addMeal($this);
        }

        return $this;
    }

    public function removeRecipe(Recipe $recipe): self
    {
        if ($this->recipes->removeElement($recipe)) {
            $recipe->removeMeal($this);
        }

        return $this;
    }
}
