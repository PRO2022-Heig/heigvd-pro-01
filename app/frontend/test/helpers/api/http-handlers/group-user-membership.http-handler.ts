import { GroupUserMembership, GroupUserMembershipService } from "../../../../src/app/api/group_user_memberships";
import { ModelHttpHandler } from "./model.http-handler";

export class GroupUserMembershipHttpHandler extends ModelHttpHandler<GroupUserMembership> {
	protected getEntryPoint(): string {
		return GroupUserMembershipService.ENTRY_POINT;
	}

	protected verifyCreate(data: unknown): number | GroupUserMembership {
		if (!data)
			return 400;

		return data as GroupUserMembership;
	}

	protected verifyUpdate(data: unknown, stored: GroupUserMembership): number | GroupUserMembership {
		// TODO: better
		return stored as GroupUserMembership;
	}

	protected override canDelete(): boolean {
		// TODO: better
		return true;
	}
}
