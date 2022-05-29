import { Group, GroupService } from "../../../../src/app/api/group";
import { ModelHttpHandler } from "./model.http-handler";

export class GroupHttpHandler extends ModelHttpHandler<Group> {
	protected override getEntryPoint(): string {
		return GroupService.ENTRY_POINT;
	}

	protected verifyCreate(data: unknown): number | Group {
		if (!data)
			return 400;

		return data as Group;
	}

	protected verifyUpdate(data: unknown, stored: Group): number | Group {
		// TODO: better
		return stored;
	}

	protected override canDelete(): boolean {
		// TODO: better
		return true;
	}
}
