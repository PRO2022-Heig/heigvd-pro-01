<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Meal\RestaurantMeal;
use App\Repository\FoodConstraintRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: FoodConstraintRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource]
class FoodConstraint extends AbstractEntity
{
    #[ORM\Column(type: "string", length: 255)]
    #[Assert\NotBlank]
    private string $name;

    #[ORM\Column(type: "text", nullable: true)]
    private string $description;

    #[ORM\ManyToMany(targetEntity: Ingredient::class, inversedBy: "foodConstraints")]
    private Collection $ingredients;

    #[ORM\ManyToMany(targetEntity: RestaurantMeal::class, mappedBy: 'foodConstraint')]
    private $restaurantMeals;

    public function __construct()
    {
        $this->ingredients = new ArrayCollection();
        $this->restaurantMeals = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Ingredient>
     */
    public function getIngredients(): Collection
    {
        return $this->ingredients;
    }

    public function addIngredient(Ingredient $ingredient): self
    {
        if (!$this->ingredients->contains($ingredient)) {
            $this->ingredients[] = $ingredient;
        }

        return $this;
    }

    public function removeIngredient(Ingredient $ingredient): self
    {
        $this->ingredients->removeElement($ingredient);

        return $this;
    }

    /**
     * @return Collection<int, RestaurantMeal>
     */
    public function getRestaurantMeals(): Collection
    {
        return $this->restaurantMeals;
    }

    public function addRestaurantMeal(RestaurantMeal $restaurantMeal): self
    {
        if (!$this->restaurantMeals->contains($restaurantMeal)) {
            $this->restaurantMeals[] = $restaurantMeal;
            $restaurantMeal->addFoodConstraint($this);
        }

        return $this;
    }

    public function removeRestaurantMeal(RestaurantMeal $restaurantMeal): self
    {
        if ($this->restaurantMeals->removeElement($restaurantMeal)) {
            $restaurantMeal->removeFoodConstraint($this);
        }

        return $this;
    }
}
