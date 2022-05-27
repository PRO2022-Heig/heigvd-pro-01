import { Injectable } from "@angular/core";

import { Model, ModelId, ModelService } from "../_lib/model";

import { MealSearch } from "../meal";
import { HomeMeal } from "./home-meal.interface";

// TODO
export interface HomeMealSearch extends MealSearch {
	"recipes.ingredients.ingredient.foodConstraints.id": ModelId | Model[];
}

@Injectable({
	providedIn: "root"
})
export class HomeMealService extends ModelService<HomeMeal, HomeMealSearch> {
	public static readonly ENTRY_POINT = "/home_meals";

	public readonly entryPoint = HomeMealService.ENTRY_POINT;

	protected override _decode() {
		// Do nothing
	}
}
