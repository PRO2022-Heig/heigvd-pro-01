import { Component, OnInit } from "@angular/core";

import { BaseComponent } from "../../_lib/_basics";

import { AuthService } from "../../../api/auth";
import { Group, GroupService } from "../../../api/group";
import { GroupUserMembershipService } from "../../../api/group_user_memberships";
import { User } from "../../../api/user";

@Component({
	selector: "app-user-groups",
	templateUrl: "./user-groups.component.html",
	styleUrls: ["./user-groups.component.scss"]
})
export class UserGroupsComponent extends BaseComponent implements OnInit {
	public groups!: Group[];

	private user!: User;

	public constructor(
		private readonly service: GroupService,
		private readonly authService: AuthService,
		private readonly gumService: GroupUserMembershipService
	) {
		super();
	}

	public async ngOnInit() {
		this.addSubscriptions(
			// The user is logged in, otherwise the authentication guard would have redirected the page.
			this.authService.getUser().subscribe(_ => this.user = _)
		);

		this.groups = await this.loadGroups();
	}

	private async loadGroups() {
		const myGroupIds = await this.gumService.find({
			"user.id": this.user.id
		}).then(_ => _.map(_ => _.__group));

		const groups = await this.service.find({id: myGroupIds});

		// TODO: set number of user per group (or load all users and them?)
		/*const allUserGM = await this.gumService.find({
			"group.id": groups.map(_ => _.id)
		});*/

		return groups;
	}

	private async create(name: string) {
		// TODO: complete
		const group = await this.service.create({name});

		return this.gumService.create({
			isAdmin: true,
			group: group["@id"],
			user: this.user["@id"]
		});
	}
}
