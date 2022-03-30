import { Model } from "../_lib/model";

import { Ingredient } from "./ingredient.interface";

export interface Step extends Model {
	action: string;
	orderNumber: number;
	ingredients: Ingredient[];
}
