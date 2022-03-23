import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { Meal } from "./meal.interface";

@Injectable({
	providedIn: "root"
})
export class MealService extends ModelService<Meal> {
	public readonly entryPoint = "/meal";
}
