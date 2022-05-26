import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { Ingredient } from "./ingredient.interface";

@Injectable({
	providedIn: "root"
})
export class IngredientService extends ModelService<Ingredient> {
	public static readonly ENTRY_POINT = "/ingredients";

	public readonly entryPoint = IngredientService.ENTRY_POINT;

	protected override _decode() {
		// Do nothing
	}
}
