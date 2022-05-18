<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\NumericFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    normalizationContext: [
        "groups" => [
            "product:list",
            "entity:full"
        ]
    ]
)]
#[ApiFilter(SearchFilter::class, properties: [
    "name" => "partial",
    "description" => "partial",
    "reference" => "partial"
])]
#[ApiFilter(NumericFilter::class, properties: ["ingredient.id"])]
class Product extends AbstractEntity
{
    #[ORM\Column(type: "string", length: 255)]
    #[Assert\NotBlank]
    #[Groups(["product:list"])]
    private string $name;

    #[ORM\Column(type: "text", nullable: true)]
    #[Groups(["product:list"])]
    private string $description;

    #[ORM\Column(type: "string", length: 255)]
    #[Assert\NotBlank]
    #[Groups(["product:list"])]
    private string $reference;

    #[ORM\ManyToOne(targetEntity: Ingredient::class, inversedBy: "products")]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["product:list"])]
    private ?Ingredient $ingredient;

    #[ORM\ManyToOne(targetEntity: Provider::class, inversedBy: "products")]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["product:list"])]
    private ?Provider $provider;

    #[ORM\Column(type: "string", length: 255)]
    #[Groups(["product:list"])]
    private string $imageUrl;

    #[ORM\ManyToMany(targetEntity: FoodConstraint::class)]
    #[Groups(["product:list"])]
    private Collection $foodConstraints;

    public function __construct()
    {
        $this->foodConstraints = new ArrayCollection();
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

    public function getReference(): ?string
    {
        return $this->reference;
    }

    public function setReference(string $reference): self
    {
        $this->reference = $reference;

        return $this;
    }

    public function getIngredient(): ?Ingredient
    {
        return $this->ingredient;
    }

    public function setIngredient(?Ingredient $ingredient): self
    {
        $this->ingredient = $ingredient;

        return $this;
    }

    public function getProvider(): ?Provider
    {
        return $this->provider;
    }

    public function setProvider(?Provider $provider): self
    {
        $this->provider = $provider;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(string $imageUrl): self
    {
        $this->imageUrl = $imageUrl;

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
        }

        return $this;
    }

    public function removeFoodConstraint(FoodConstraint $foodConstraint): self
    {
        $this->foodConstraints->removeElement($foodConstraint);

        return $this;
    }
}
