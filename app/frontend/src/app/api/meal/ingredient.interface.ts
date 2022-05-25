import { Model } from "../_lib/model";

export interface Ingredient extends Model {
	// TODO: remove (use the ones from API)
	name: string;
	description: string;
	quantity: number;
	unit: string;
}
