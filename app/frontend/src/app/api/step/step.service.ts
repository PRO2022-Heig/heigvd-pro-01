import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { recipeDecodeEntityName } from "../recipe";
import { Step } from "./step.interface";

@Injectable({
	providedIn: "root"
})
export class StepService extends ModelService<Step> {
	public static readonly ENTRY_POINT = "/steps";

	public readonly entryPoint = StepService.ENTRY_POINT;

	public override _decode(model: Step) {
		Object.defineProperty(model, "__recipe" as keyof Step, {
			get: () => recipeDecodeEntityName(model.recipe)
		});

		return model;
	}
}
