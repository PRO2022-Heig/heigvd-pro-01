import { ModelId } from "../_lib/model";

import { Meal } from "../meal";

export interface RestaurantMeal extends Meal {
	home_type: "restaurant_meal";

	foodConstraint: string[];
	__foodConstraint: ModelId[]; // decoded

	restaurant: string;
	__restaurant: ModelId; // decoded
}
