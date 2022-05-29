import { Model } from "../_lib/model";

export interface Ingredient extends Model {
	name: string;
	description: string;

	// TODO: complete
	// TODO: productId?
	foodConstraints: string[];
	products: string[];
}
