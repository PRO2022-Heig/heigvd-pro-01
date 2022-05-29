import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";
import { ModelSearch } from "../_lib/model/model.types";

import { Meal, MealWithType } from "./meal.interface";

// TODO
export interface MealSearch extends Partial<Pick<Meal, "name" | "description">>, ModelSearch<Meal> {
}

@Injectable({
	providedIn: "root"
})
export class MealService extends ModelService<Meal, MealSearch> {
	public static readonly ENTRY_POINT = "/meals";

	public readonly entryPoint = MealService.ENTRY_POINT;

	protected override _decode(model: Meal) {
		model.home_type = (model as MealWithType)["@type"]
			.split("M").join("_m").toLowerCase() as Meal["home_type"];

		return model;
	}
}
