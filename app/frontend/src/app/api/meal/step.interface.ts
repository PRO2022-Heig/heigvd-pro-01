import { Model } from "../_lib/model";

import { Ingredient } from "./ingredient.interface";

export interface Step extends Model {
	// TODO: remove (use the ones from API)
	action: string;
	orderNumber: number;
	ingredients: Ingredient[];
}
