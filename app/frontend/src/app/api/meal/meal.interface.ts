import { Model } from "../_lib/model";

export type MealType = "home_meal" | "restaurant_meal";

export interface Meal extends Model {
	name: string;
	description: string;

	home_type: MealType;
}

export interface MealWithType extends Meal {
	"@type": "HomeMeal" | "RestaurantMeal";
}
