import { Model } from "../_lib/model";

export interface Ingredient extends Model {
	name: string;
	description: string;
	quantity: number;
	unit: string;
}
