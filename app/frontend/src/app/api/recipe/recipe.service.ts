import { Injectable } from "@angular/core";

import { ModelId, ModelService } from "../_lib/model";
import { ModelNumberFilter, ModelSearch } from "../_lib/model/model.types";

import { ApiClientModule } from "../api-client.module";
import { HomeMealService } from "../home-meal";
import { IngredientService } from "../ingredients";
import { StepService } from "../step";
import { RECIPES_ENTRY_POINT} from "./recipe.constants";
import { Recipe, RecipeIngredient } from "./recipe.interface";

export interface RecipeSearch extends ModelSearch<Recipe>, Partial<Pick<Recipe, "name" | "description">> {
	"meals.id"?: ModelId | ModelId[];
	"ingredients.ingredient.products.foodConstraints.id"?: ModelId | ModelId[];
	"not_in_ingredients.ingredient.products.foodConstraints.id"?: ModelId[];

	duration?: ModelNumberFilter;
	numberOfPeople?: ModelNumberFilter;
}

@Injectable({
	providedIn: "root"
})
export class RecipeService extends ModelService<Recipe, RecipeSearch> {
	public static readonly ENTRY_POINT = RECIPES_ENTRY_POINT;

	public readonly entryPoint = RecipeService.ENTRY_POINT;

	public constructor(
		client: ApiClientModule,
		private readonly homeMealService: HomeMealService,
		private readonly ingredientService: IngredientService,
		private readonly stepService: StepService) {
		super(client);
	}

	public override _decode(model: Recipe) {
		Object.defineProperty(model, "__meals" as keyof Recipe, {
			get: () => model.meals.map(_ => this.homeMealService.decodeEntityName(_))
		});

		Object.defineProperty(model, "__steps" as keyof Recipe, {
			get: () => model.steps.map(_ => this.stepService.decodeEntityName(_))
		});

		for (const ingredient of model.ingredients) {
			Object.defineProperty(ingredient, "__recipe" as keyof RecipeIngredient, {
				get: () => this.decodeEntityName(ingredient.recipe)
			});

			ingredient.ingredient = this.ingredientService._decode(ingredient.ingredient);
		}

		return model;
	}
}
