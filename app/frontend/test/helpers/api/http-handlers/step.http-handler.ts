import { Model } from "../../../../src/app/api/_lib/model";

import { Step, StepService } from "../../../../src/app/api/step";
import { ModelHttpHandler } from "./model.http-handler";

export class StepHttpHandler<T extends Model = Step> extends ModelHttpHandler<T> {
	protected override getEntryPoint(): string {
		return StepService.ENTRY_POINT;
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