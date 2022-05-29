import { Model } from "../../../../src/app/api/_lib/model";

import { Meal, MealService } from "../../../../src/app/api/meal";
import { ModelHttpHandler } from "./model.http-handler";

export class MealHttpHandler<T extends Model = Meal> extends ModelHttpHandler<T> {
	protected override getEntryPoint(): string {
		return MealService.ENTRY_POINT;
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

	protected override canDelete(): boolean {
		// TODO: better
		return true;
	}
}
