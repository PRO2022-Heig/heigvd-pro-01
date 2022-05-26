import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { Meal } from "./meal.interface";

@Injectable({
	providedIn: "root"
})
export class MealService extends ModelService<Meal> {
	public static readonly ENTRY_POINT = "/meals";

	public readonly entryPoint = MealService.ENTRY_POINT;

	protected override _decode() {
		// Do nothing
	}
}
