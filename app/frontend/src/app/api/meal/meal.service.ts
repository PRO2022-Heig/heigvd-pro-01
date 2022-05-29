import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";
import { ModelSearch } from "../_lib/model/model.types";

import { Meal } from "./meal.interface";

// TODO
export type MealSearch = Partial<Meal> | ModelSearch<Meal>;

@Injectable({
	providedIn: "root"
})
export class MealService extends ModelService<Meal, MealSearch> {
	public static readonly ENTRY_POINT = "/meals";

	public readonly entryPoint = MealService.ENTRY_POINT;

	protected override _decode(model: Meal) {
		model.home_type = (model as {"@type": string} & Meal)["@type"]
			.split("M").join("_m").toLowerCase() as Meal["home_type"];

		return model;
	}
}
