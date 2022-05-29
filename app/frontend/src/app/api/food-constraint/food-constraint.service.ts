import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";
import { ModelSearch } from "../_lib/model/model.types";

import { FoodConstraint } from "./food-constraint.interface";

// TODO
export type FoodConstraintSearch = Partial<FoodConstraint> | ModelSearch<FoodConstraint>;

@Injectable({
	providedIn: "root"
})
export class FoodConstraintService extends ModelService<FoodConstraint, FoodConstraintSearch> {
	public static readonly ENTRY_POINT = "/food_constraints";

	public readonly entryPoint = FoodConstraintService.ENTRY_POINT;

	protected _decode() {
		// Do nothing
	}
}
