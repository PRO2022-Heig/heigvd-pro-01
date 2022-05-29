import { Model } from "../_lib/model";

export interface FoodConstraint extends Model {
	name: string;
	description: string;

	// TODO: complete
	ingredients: string[];
	restaurantMeals: string[];
}
