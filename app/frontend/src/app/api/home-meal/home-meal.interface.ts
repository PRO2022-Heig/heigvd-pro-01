import { ModelId } from "../_lib/model";

import { Meal } from "../meal";

export interface HomeMeal extends Meal {
	home_type: "home_meal";

	recipes: string[];
	__recipes: ModelId[]; // decoded
}
