import {Meal, MealService} from "../../../../src/app/api/meal";
import { ModelHttpHandler } from "./model.http-handler";

export class MealHttpHandler extends ModelHttpHandler<Meal> {
	protected override getEntryPoint(): string {
		return MealService.ENTRY_POINT;
	}

	protected override verifyCreate(data: unknown): number | Meal {
		if (!data)
			return 400;

		return data as Meal;
	}

	protected override verifyUpdate(data: unknown, stored: Meal): number | Meal {
		// TODO: better
		return stored;
	}
}
