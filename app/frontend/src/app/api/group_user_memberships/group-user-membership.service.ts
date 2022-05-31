import { Injectable } from "@angular/core";

import { ModelId, ModelService } from "../_lib/model";
import { ModelSearch } from "../_lib/model/model.types";

import { ApiClientModule } from "../api-client.module";
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

	public constructor(
		client: ApiClientModule,
		private readonly groupService: GroupService,
		private readonly userService: UserService
	) {
		super(client);
	}


	protected override _decode(gum: GroupUserMembership) {
		gum.__group = this.groupService.decodeEntityName(gum.group);
		gum.__user = this.userService.decodeEntityName(gum.user);

		return gum;
	}
}
