import { Model } from "../_lib/model";

import {Recipe} from "./recipe.interface";

export interface Meal extends Model {
	name: string;
	description: string;
	recipes: Recipe[];
}
