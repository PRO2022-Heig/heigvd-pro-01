import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { GroupUserMemberships } from "./group-user-memberships.interface";

@Injectable({
	providedIn: "root"
})
export class GroupUserMembershipsService extends ModelService<GroupUserMemberships> {
	public static readonly ENTRY_POINT = "/group_user_memberships";

	public readonly entryPoint = GroupUserMembershipsService.ENTRY_POINT;
}
