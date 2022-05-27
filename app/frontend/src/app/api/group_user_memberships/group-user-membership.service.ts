import { Injectable } from "@angular/core";

import { ModelId, ModelService } from "../_lib/model";
import { ModelSearch } from "../_lib/model/model.types";

import { GroupService } from "../group";
import { UserService } from "../user";
import { GroupUserMembership } from "./group-user-membership.interface";

export interface GUMSearch extends ModelSearch<GroupUserMembership> {
	"group.id"?: ModelId | ModelId[];
	"user.id"?: ModelId | ModelId[];
}

@Injectable({
	providedIn: "root"
})
export class GroupUserMembershipService extends ModelService<GroupUserMembership, GUMSearch> {
	public static readonly ENTRY_POINT = "/group_user_memberships";

	public readonly entryPoint = GroupUserMembershipService.ENTRY_POINT;

	protected override _decode(gum: GroupUserMembership) {
		gum.__group = +gum.group.substring(GroupService.ENTRY_POINT.length + 1);
		gum.__user = +gum.user.substring(UserService.ENTRY_POINT.length + 1);

		return gum;
	}
}
