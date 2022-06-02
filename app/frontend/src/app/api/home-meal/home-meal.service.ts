import { Injectable } from "@angular/core";

import { ModelId } from "../_lib/model";
import { ModelNumberFilter } from "../_lib/model/model.types";

import { MealSearch, MealService } from "../meal";
import { recipeDecodeEntityName } from "../recipe";
import { HomeMeal } from "./home-meal.interface";

// TODO
export interface HomeMealSearch extends MealSearch {
	"recipes.duration"?: ModelNumberFilter;
	"recipes.ingredients.ingredient.foodConstraints.id"?: ModelId | ModelId[];
	"not_in_recipes.ingredients.ingredient.foodConstraints.id"?: ModelId[];
}

@Injectable({
	providedIn: "root"
})
export class HomeMealService extends MealService<HomeMeal, HomeMealSearch> {
	public static override readonly ENTRY_POINT = "/home_meals";

	public override readonly entryPoint = HomeMealService.ENTRY_POINT;

	public override _decode(model: HomeMeal) {
		Object.defineProperty(model, "__recipes" as keyof HomeMeal, {
			get: () => model.recipes.map(recipeDecodeEntityName)
		});

		model.home_type = "home_meal";

		return model;
	}
}
