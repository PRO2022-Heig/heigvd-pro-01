<?php

namespace App\DataFixtures;

use App\Entity\Meal\HomeMeal;
use App\Entity\Recipe;
use App\Entity\RecipeIngredient;
use App\Entity\Step;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use function trim;

class RecipeFixture extends AbstractDataImportFixture implements DependentFixtureInterface
{
    protected const JSON_FILE = "recipes.json";
    private int $notfound = 0;
    private int $found = 0;
    private int $recipeCounter = 0;

    public function load(ObjectManager $manager): void
    {
        $data = $this->getJsonData(mandatoryFields: ["name", "personnes", "steps", "ingredients", "duration"]);
        $ingredientTagMapping = $this->getJsonData("recipes_ingredients__tags.json");
        $undefinedUnit = $this->getReference("unit-undefined");

        foreach ($data as $item) {
            $recipe = new Recipe();
            $recipe
                ->setName($item["name"])
                ->setDuration($item["duration"])
                ->setNumberOfPeople($item["personnes"]);

            $stepCounter = 1;
            foreach ($item["steps"] as $recipeStep) {
                $step = new Step();
                $step
                    ->setAction($recipeStep)
                    ->setNumber($stepCounter++);

                $recipe->addStep($step);
            }
            foreach ($item["ingredients"] as $subItem) {
                $recipeIngredient = new RecipeIngredient();

                $ingredientMap = $ingredientTagMapping[$subItem["main_ingredient"]];
                $ingredient = null;
                foreach ($ingredientMap as $tag) {
                    if ($this->hasReference("ingredient-" . $tag)) {
                        $ingredient = $this->getReference("ingredient-" . $tag);
                        ++$this->found;
                        break;
                    }
                }

                if ($ingredient === null) {
                    $this->logger->debug("ingredient: " . $subItem["main_ingredient"] . " has no tag matching");
                    ++$this->notfound;
                    continue;
                }

                $unitRef = "unit-" . trim($subItem["unit"]);
                if ($this->hasReference($unitRef)) {
                    $unit = $this->getReference($unitRef);
                } else {
                    $unit = $undefinedUnit;
                }

                $recipeIngredient
                    ->setUnit($unit)
                    ->setQuantity((float) $subItem["qty"])
                    ->setIngredient($ingredient);

                $recipe->addIngredient($recipeIngredient);
            }

            $this->addReference("recipe-" . $this->recipeCounter++, $recipe);
            $meal = new HomeMeal();
            $meal
                ->setName($item["name"])
                ->addRecipe($recipe);
            $manager->persist($meal);
            $manager->persist($recipe);
        }

        if ($this->notfound > 0) {
            $this->logger->warning("Not all ingredients were found (" . $this->found . " found, " . $this->notfound . " not found)");
        }
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            IngredientFixture::class,
            UnitFixture::class
        ];
    }
}
