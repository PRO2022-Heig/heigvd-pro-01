import { Model } from "../../../../src/app/api/_lib/model";

import { Recipe, RecipeService } from "../../../../src/app/api/recipe";
import { ModelHttpHandler } from "./model.http-handler";

export class RecipeHttpHandler<T extends Model = Recipe> extends ModelHttpHandler<T> {
	protected override getEntryPoint(): string {
		return RecipeService.ENTRY_POINT;
	}

	protected override verifyCreate(data: unknown): number | T {
		if (!data)
			return 400;

		return data as T;
	}

	protected override verifyUpdate(data: unknown, stored: T): number | T {
		// TODO: better
		return stored;
	}
}
