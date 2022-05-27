import { Injectable } from "@angular/core";

import { Model, ModelId, ModelService } from "../_lib/model";

import { MealSearch } from "../meal";
import { RestaurantMeal } from "./restaurant-meal.interface";

// TODO
export interface RestaurantMealSearch extends MealSearch {
	"foodConstraint.id": ModelId | Model[];
}

@Injectable({
	providedIn: "root"
})
export class RestaurantMealService extends ModelService<RestaurantMeal, RestaurantMealSearch> {
	public static readonly ENTRY_POINT = "/restaurant_meals";

	public readonly entryPoint = RestaurantMealService.ENTRY_POINT;

	protected override _decode() {
		// Do nothing
	}
}
