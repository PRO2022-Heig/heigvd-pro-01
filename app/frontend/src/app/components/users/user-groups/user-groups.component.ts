import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

import { BaseComponent } from "../../_lib/_basics";

import { AuthService } from "../../../api/auth";
import { EventService } from "../../../api/event";
import { GroupService } from "../../../api/group";
import { GroupUserMembershipService } from "../../../api/group_user_memberships";
import { User, UserService } from "../../../api/user";
import { getAllEventsGroups, GroupHelped, GroupUserMembershipHelped } from "../user-event-group.helper";

@Component({
	selector: "app-user-groups",
	templateUrl: "./user-groups.component.html",
	styleUrls: ["./user-groups.component.scss"]
})
export class UserGroupsComponent extends BaseComponent implements OnInit {
	public groups: GroupHelped[] = [];
	public user!: User;

	public readonly addGroupCtrl = new FormControl("", [Validators.required]);

	public constructor(
		private readonly service: GroupService,
		private readonly authService: AuthService,
		private readonly eventService: EventService,
		private readonly groupService: GroupService,
		private readonly guMembershipService: GroupUserMembershipService,
		private readonly userService: UserService
	) {
		super();
	}

	public async ngOnInit() {
		this.addSubscriptions(
			// The user is logged in, otherwise the authentication guard would have redirected to the login page.
			this.authService.getUser().subscribe(_ => this.user = _)
		);

		// TODO: reload button
		this.groups = await getAllEventsGroups({
			eventService: this.eventService,
			groupService: this.groupService,
			guMembershipService: this.guMembershipService,
			userService: this.userService
		}, this.user).then(_ => _.groups);
	}

	public async createGroup() {
		if (!this.addGroupCtrl.valid)
			return;

		return this.service.create<GroupHelped>({name: this.addGroupCtrl.value}).then(async group => {
			const membership = await this.guMembershipService.create<GroupUserMembershipHelped>({
				isAdmin: true,
				group: group["@id"],
				user: this.user["@id"]
			});

			group._events = [];
			membership._user = this.user;
			group.memberships = [membership];

			this.addGroupCtrl.setValue("");
			this.groups.push(group);
		});
	}

	public removedGroup(group: GroupHelped) {
		this.groups.splice(this.groups.findIndex(_ => _.id === group.id), 1);
	}
}
