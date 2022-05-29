import { Model, ModelId } from "../_lib/model";

export interface Recipe extends Model {
	name: string;
	description: string;
	numberOfPeople: number;

	meals: string[];
	__meals: ModelId[]; // decoded

	steps: string[];
	__steps: ModelId[]; // decoded

	ingredients: never[]; // TODO: use the Ingredient API interface? (I think not)
}
