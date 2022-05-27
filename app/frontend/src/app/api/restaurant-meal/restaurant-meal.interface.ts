import { Meal } from "../meal";

export interface RestaurantMeal extends Meal {
	home_type: "restaurant_meal";
}
