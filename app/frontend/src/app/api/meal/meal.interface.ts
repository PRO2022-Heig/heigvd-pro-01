import { Model } from "../_lib/model";

export interface Meal extends Model {
	name: string;
	description: string;

	home_type: "home_meal" | "restaurant_meal";
}

export interface MealWithType extends Meal {
	"@type": "HomeMeal" | "RestaurantMeal";
}
