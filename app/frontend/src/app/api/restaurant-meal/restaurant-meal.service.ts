import { Injectable } from "@angular/core";

import { Model, ModelId } from "../_lib/model";

import { ApiClientModule } from "../api-client.module";
import { FoodConstraintService } from "../food-constraint";
import { MealSearch, MealService } from "../meal";
import { restaurantDecodeEntityName } from "../restaurant/restaurant.constants";
import { RestaurantMeal } from "./restaurant-meal.interface";

// TODO
export interface RestaurantMealSearch extends MealSearch {
	"foodConstraint.id"?: ModelId | Model[];
}

@Injectable({
	providedIn: "root"
})
export class RestaurantMealService extends MealService<RestaurantMeal, RestaurantMealSearch> {
	public static override readonly ENTRY_POINT = "/restaurant_meals";

	public override readonly entryPoint = RestaurantMealService.ENTRY_POINT;

	public constructor(
		client: ApiClientModule,
		protected readonly foodConstraintService: FoodConstraintService) {
		super(client);
	}

	public override _decode(model: RestaurantMeal) {
		Object.defineProperty(model, "__foodConstraint" as keyof RestaurantMeal, {
			get: () => model.foodConstraint.map(_ => this.foodConstraintService.decodeEntityName(_))
		});

		Object.defineProperty(model, "__restaurant" as keyof RestaurantMeal, {
			get: () => restaurantDecodeEntityName(model.restaurant)
		});

		return model;
	}
}
