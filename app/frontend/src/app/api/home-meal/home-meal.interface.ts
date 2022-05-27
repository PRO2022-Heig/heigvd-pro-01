import { Meal } from "../meal";

export interface HomeMeal extends Meal {
	home_type: "home_meal";
}
