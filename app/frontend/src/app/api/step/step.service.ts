import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import {Step} from "./step.interface";

@Injectable({
	providedIn: "root"
})
export class StepService extends ModelService<Step> {
	public static readonly ENTRY_POINT = "/steps";

	public readonly entryPoint = StepService.ENTRY_POINT;

	protected override _decode() {
		// Do nothing
	}
}
