import { Step, StepService } from "../../../../src/app/api/step";
import { ModelHttpHandler } from "./model.http-handler";

export class StepHttpHandler extends ModelHttpHandler<Step> {
	protected override getEntryPoint(): string {
		return StepService.ENTRY_POINT;
	}

	protected override verifyCreate(data: unknown): number | Step {
		if (!data)
			return 400;

		return data as Step;
	}

	protected override verifyUpdate(data: unknown, stored: Step): number | Step {
		// TODO: better
		return stored;
	}

	protected override canDelete(): boolean {
		// TODO: better
		return true;
	}
}
