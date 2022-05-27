import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { FoodConstraint } from "./food-constraint.interface";

@Injectable({
	providedIn: "root"
})
export class FoodConstraintService extends ModelService<FoodConstraint> {
	public static readonly ENTRY_POINT = "/food-constraint";

	public readonly entryPoint = FoodConstraintService.ENTRY_POINT;
}
