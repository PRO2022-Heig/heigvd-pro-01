<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\IngredientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: IngredientRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: ["name" => "partial", "description" => "partial"])]
class Ingredient extends AbstractEntity
{
    #[ORM\Column(type: "string", length: 255)]
    #[Assert\NotBlank]
    #[Groups(["product:list"])]
    private string $name;

    #[ORM\Column(type: "text", nullable: true)]
    private ?string $description;

    #[ORM\ManyToMany(targetEntity: FoodConstraint::class, mappedBy: "ingredients")]
    private Collection $foodConstraints;

    #[ORM\OneToMany(mappedBy: "ingredient", targetEntity: Product::class)]
    private Collection $products;

    public function __construct()
    {
        $this->foodConstraints = new ArrayCollection();
        $this->products = new ArrayCollection();
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
     * @return Collection<int, FoodConstraint>
     */
    public function getFoodConstraints(): Collection
    {
        return $this->foodConstraints;
    }

    public function addFoodConstraint(FoodConstraint $foodConstraint): self
    {
        if (!$this->foodConstraints->contains($foodConstraint)) {
            $this->foodConstraints[] = $foodConstraint;
            $foodConstraint->addIngredient($this);
        }

        return $this;
    }

    public function removeFoodConstraint(FoodConstraint $foodConstraint): self
    {
        if ($this->foodConstraints->removeElement($foodConstraint)) {
            $foodConstraint->removeIngredient($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Product>
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
            $product->setIngredient($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getIngredient() === $this) {
                $product->setIngredient(null);
            }
        }

        return $this;
    }
}
