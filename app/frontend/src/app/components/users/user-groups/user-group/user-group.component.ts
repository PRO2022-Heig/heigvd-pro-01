import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter, switchMap } from "rxjs";

import { ModelWithId } from "../../../../api/_lib/model";
import { BaseComponent } from "../../../_lib/_basics";

import { AuthService } from "../../../../api/auth";
import { EventService } from "../../../../api/event";
import { GroupService } from "../../../../api/group";
import { GroupUserMembershipService } from "../../../../api/group_user_memberships";
import { User, UserService } from "../../../../api/user";
import { EventHelped, GroupHelped, GroupUserMembershipHelped } from "../../user-event-group.helper";

interface AddUserForm extends FormGroup {
	controls: {
		isAdmin: FormControl;
		search: FormControl;
	};

	value: {
		[K in keyof AddUserForm["controls"]]: AddUserForm["controls"][K]["value"];
	};
}

@Component({
	selector: "app-user-group",
	templateUrl: "./user-group.component.html",
	styleUrls: ["./user-group.component.scss"]
})
export class UserGroupComponent extends BaseComponent implements OnInit {
	@Input()
	public readonly group!: GroupHelped;
	public user!: User;

	public users: User[] = [];
	public readonly addGroupCtrl: FormControl;
	public readonly addUserForm: AddUserForm;

	/**
	 * When a group disappears, It does not need to stay visible
	 */
	@Output()
	public groupDisappears = new EventEmitter<GroupHelped>();

	public constructor(
		private readonly authService: AuthService,
		private readonly eventService: EventService,
		private readonly groupService: GroupService,
		private readonly guMembershipService: GroupUserMembershipService,
		private readonly userService: UserService
	) {
		super();

		this.addGroupCtrl = new FormControl("", [Validators.required]);

		this.addUserForm = new FormGroup({
			isAdmin: new FormControl(false),
			search: new FormControl("")
		} as AddUserForm["controls"]) as AddUserForm;
	}

	public ngOnInit() {
		this.addSubscriptions(
			// The user is logged in, otherwise the authentication guard would have redirected to the login page.
			this.authService.getUser().subscribe(_ => this.user = _),

			this.addUserForm.controls.search.valueChanges.pipe(
				debounceTime(250),
				filter((_: string) => !!_),
				distinctUntilChanged(),
				switchMap(text =>
					this.userService.find({emailAddress: text})
						.then(users => users.filter(_ => !this.group.memberships.map(_ => _.__user).includes(_.id)))
						.catch(() => [])
				)
			).subscribe(users => this.users = users)
		);
	}

	public amIAdmin() {
		return !!this.group.memberships.find(_ => _.__user === this.user.id)?.isAdmin;
	}

	public canIDelete() {
		// Can delete if admin and the last admin
		return this.amIAdmin() && this.group.memberships.filter(_ => _.isAdmin).length === 1;
	}

	public canIQuit() {
		// Can quit if there's at least one another admin
		return !this.amIAdmin() || this.group.memberships.filter(_ => _.isAdmin).length > 1;
	}

	public canRemove(membership: GroupUserMembershipHelped) {
		return this.amIAdmin() && !membership.isAdmin;
	}

	public async addToGroup(user: User) {
		if (!this.amIAdmin())
			return;

		return this.guMembershipService.create<GroupUserMembershipHelped>({
			group: this.group["@id"],
			user: user["@id"],
			isAdmin: this.addUserForm.controls.isAdmin.value
		}).then(membership => {
			membership._user = user;
			this.group.memberships.push(membership);

			this.addUserForm.controls.search.setValue("");
		});
	}

	public async createEvent() {
		if (!this.addGroupCtrl.valid || !this.amIAdmin())
			return;

		return this.eventService.create<EventHelped>({
			group: this.group["@id"],
			name: this.addGroupCtrl.value
		}).then(event => {
			event._group = this.group;

			this.group.events.push(event["@id"]);
			this.group._events.push(event);

			this.addGroupCtrl.setValue("");
		});
	}

	public async deleteGroup() {
		if (!this.canIDelete())
			return;

		// Force deletion of all memberships
		const memberships = await this.guMembershipService.find({
			"group.id": this.group.id
		});

		for (const membership of memberships)
			await this.guMembershipService.delete(membership);

		return this.groupService.delete(this.group.id).then(() => {
			this.groupDisappears.emit(this.group);
		});
	}

	public async quitGroup() {
		if (!this.canIQuit())
			return;

		return this.guMembershipService.delete(this.group.memberships.find(_ => _.__user === this.user.id) as ModelWithId).then(() => {
			this.groupDisappears.emit(this.group);
		});
	}

	public async removeFromGroup(membership: GroupUserMembershipHelped) {
		if (!this.canRemove(membership))
			return;

		return this.guMembershipService.delete(membership.id).then(() => {
			this.group.memberships.splice(this.group.memberships.findIndex(_ => _.id === membership.id), 1);
		});
	}
}
