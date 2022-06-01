import { RestaurantMeal, RestaurantMealService } from "../../../../src/app/api/restaurant-meal";
import { MealHttpHandler } from "./meal.http-handler";

export class RestaurantMealHttpHandler extends MealHttpHandler<RestaurantMeal> {
	protected override getEntryPoint(): string {
		return RestaurantMealService.ENTRY_POINT;
	}
}
