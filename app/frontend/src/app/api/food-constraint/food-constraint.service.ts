import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { FoodConstraint } from "./food-constraint.interface";

// TODO
export type FoodConstraintSearch = Partial<FoodConstraint>;

@Injectable({
	providedIn: "root"
})
export class FoodConstraintService extends ModelService<FoodConstraint, FoodConstraintSearch> {
	public static readonly ENTRY_POINT = "/food-constraint";

	public readonly entryPoint = FoodConstraintService.ENTRY_POINT;

	protected _decode() {
		// Do nothing
	}
}
