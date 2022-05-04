import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { FoodConstraint } from "./food-constraint.interface";

@Injectable({
	providedIn: "root"
})
export class FoodConstraintService extends ModelService<FoodConstraint> {
	public readonly entryPoint = "/food-constraint";
}
