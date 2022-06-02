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
export class MealService<T extends Meal = Meal, MS = MealSearch> extends ModelService<T, MS> {
	public static readonly ENTRY_POINT: string = "/meals";

	public readonly entryPoint: string = MealService.ENTRY_POINT;

	public override _decode(model: T) {
		model.home_type = (model as unknown as MealWithType)["@type"]
			.split("M").join("_m").toLowerCase() as T["home_type"];

		return model;
	}
}
