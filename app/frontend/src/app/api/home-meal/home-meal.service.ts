import { Injectable } from "@angular/core";

import { Model, ModelId } from "../_lib/model";

import { MealSearch, MealService } from "../meal";
import { recipeDecodeEntityName } from "../recipe";
import { HomeMeal } from "./home-meal.interface";

// TODO
export interface HomeMealSearch extends MealSearch {
	"recipes.ingredients.ingredient.foodConstraints.id"?: ModelId | Model[];
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

		return model;
	}
}
