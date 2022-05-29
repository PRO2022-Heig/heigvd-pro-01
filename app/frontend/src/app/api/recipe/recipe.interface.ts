import { Model } from "../_lib/model";

export type RecipeStep = number;

export interface Recipe extends Model {
	name: string;
	description: string;
	numberOfPeople: number;
}
