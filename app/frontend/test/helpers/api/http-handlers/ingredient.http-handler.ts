import { Ingredient, IngredientService } from "../../../../src/app/api/ingredients";
import { ModelHttpHandler } from "./model.http-handler";

export class IngredientHttpHandler extends ModelHttpHandler<Ingredient> {
	protected override getEntryPoint(): string {
		return IngredientService.ENTRY_POINT;
	}

	protected override verifyCreate(data: unknown): number | Ingredient {
		if (!data)
			return 400;

		return data as Ingredient;
	}

	protected override verifyUpdate(data: unknown, stored: Ingredient): number | Ingredient {
		// TODO: better
		return stored;
	}

	protected override canDelete(): boolean {
		// TODO: better
		return true;
	}
}
