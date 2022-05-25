<?php

namespace App\Entity\Meal;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\NumericFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Entity\FoodConstraint;
use App\Entity\Meal;
use App\Entity\Restaurant;
use App\Repository\Meal\RestaurantMealRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RestaurantMealRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource]
#[ApiFilter(NumericFilter::class, properties: ["foodConstraint.id"])]
class RestaurantMeal extends Meal
{
    #[ORM\ManyToOne(targetEntity: Restaurant::class, inversedBy: "meals")]
    #[ORM\JoinColumn(nullable: true)]
    #[Assert\NotNull]
    private ?Restaurant $restaurant;

    #[ORM\ManyToMany(targetEntity: FoodConstraint::class, inversedBy: "restaurantMeals")]
    private Collection $foodConstraint;

    public function __construct()
    {
        $this->foodConstraint = new ArrayCollection();
    }

    public function getRestaurant(): ?Restaurant
    {
        return $this->restaurant;
    }

    public function setRestaurant(?Restaurant $restaurant): self
    {
        $this->restaurant = $restaurant;

        return $this;
    }

    /**
     * @return Collection<int, FoodConstraint>
     */
    public function getFoodConstraint(): Collection
    {
        return $this->foodConstraint;
    }

    public function addFoodConstraint(FoodConstraint $foodConstraint): self
    {
        if (!$this->foodConstraint->contains($foodConstraint)) {
            $this->foodConstraint[] = $foodConstraint;
        }

        return $this;
    }

    public function removeFoodConstraint(FoodConstraint $foodConstraint): self
    {
        $this->foodConstraint->removeElement($foodConstraint);

        return $this;
    }
}
