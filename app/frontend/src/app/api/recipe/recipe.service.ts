import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { Recipe } from "./recipe.interface";

@Injectable({
	providedIn: "root"
})
export class RecipeService extends ModelService<Recipe> {
	public static readonly ENTRY_POINT = "/recipes";

	public readonly entryPoint = RecipeService.ENTRY_POINT;

	protected override _decode() {
		// Do nothing
	}
}
