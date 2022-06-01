import { Model, ModelId } from "../_lib/model";

export interface Ingredient extends Model {
	name: string;
	description: string;

	foodConstraints: string[];
	__foodConstraints: ModelId[]; // decoded

	products: string[];
	__products: ModelId[]; // decoded
}
