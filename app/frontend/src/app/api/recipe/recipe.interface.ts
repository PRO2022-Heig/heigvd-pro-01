import { Model, ModelId } from "../_lib/model";

import { Ingredient } from "../ingredients";

export interface RecipeIngredientUnit extends Model {
	name: string;
	type: string;

	__isInitialized__: boolean;
}

export interface RecipeIngredient extends Model {
	products: never[]; // TODO?
	quantity: number;

	recipe: string;
	__recipe: ModelId; // decoded

	ingredient: Ingredient;
	unit: RecipeIngredientUnit;
}

export interface Recipe extends Model {
	name: string;
	description: string;
	numberOfPeople: number;

	meals: string[];
	__meals: ModelId[]; // decoded

	steps: string[];
	__steps: ModelId[]; // decoded

	ingredients: RecipeIngredient[];
}
