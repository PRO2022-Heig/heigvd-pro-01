import { FoodConstraint, FoodConstraintService } from "../../../../src/app/api/food-constraint";
import { ModelHttpHandler } from "./model.http-handler";

export class FoodConstraintHttpHandler extends ModelHttpHandler<FoodConstraint> {
	protected override getEntryPoint(): string {
		return FoodConstraintService.ENTRY_POINT;
	}

	protected override verifyCreate(data: unknown): number | FoodConstraint {
		if (!data)
			return 400;

		return data as FoodConstraint;
	}

	protected override verifyUpdate(data: unknown, stored: FoodConstraint): number | FoodConstraint {
		// TODO: better
		return stored;
	}

	protected override canDelete() {
		// TODO: better
		return true;
	}
}
