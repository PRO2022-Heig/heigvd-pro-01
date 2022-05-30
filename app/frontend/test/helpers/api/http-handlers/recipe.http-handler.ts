import { Recipe, RecipeService } from "../../../../src/app/api/recipe";
import { ModelHttpHandler } from "./model.http-handler";

export class RecipeHttpHandler extends ModelHttpHandler<Recipe> {
	protected override getEntryPoint(): string {
		return RecipeService.ENTRY_POINT;
	}

	protected override verifyCreate(data: unknown): number | Recipe {
		if (!data)
			return 400;

		return data as Recipe;
	}

	protected override verifyUpdate(data: unknown, stored: Recipe): number | Recipe {
		// TODO: better
		return stored;
	}

	protected override canDelete(): boolean {
		// TODO: better
		return true;
	}
}
