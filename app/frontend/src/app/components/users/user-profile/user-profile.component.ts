import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { BaseComponent } from "../../_lib/_basics";

import { sleep } from "../../../../helpers";
import { AuthService } from "../../../api/auth";
import { User, UserService } from "../../../api/user";

interface UserFormGroup extends FormGroup {
	controls: {
		firstName: FormControl;
		lastName: FormControl;
	};

	value: {
		[K in keyof UserFormGroup["controls"]]: UserFormGroup["controls"][K]["value"];
	};
}

@Component({
	selector: "app-user-profile",
	templateUrl: "./user-profile.component.html",
	styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent extends BaseComponent {
	// TODO

	public readonly state = {
		edit: false,
		loading: false
	};
	public user!: User;

	public readonly userForm: UserFormGroup;

	public constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly router: Router) {
		super();

		this.userForm = new FormGroup({
			firstName: new FormControl(),
			lastName: new FormControl()
		} as UserFormGroup["controls"]) as UserFormGroup;
	}

	public ngOnInit(): void {
		this.addSubscriptions(
			this.authService.getUser().subscribe(user => {
				this.user = user;

				this.userForm.controls.firstName.setValue(user.firstName);
				this.userForm.controls.lastName.setValue(user.lastName);
			})
		);

		this.toggleFormState();
	}

	public async updateUser() {
		if (!this.state.edit || this.state.loading || !this.userForm.valid)
			return;

		this.state.loading = true;
		this.toggleFormState();

		return this.userService.update({
			id: this.user.id,
			firstName: this.userForm.controls.firstName.value,
			lastName: this.userForm.controls.lastName.value
		})
			.then(() => this.authService.getConnected())
			.then(() => sleep(300))
			.finally(() => {
				this.state.edit = false;
				this.state.loading = false;
				this.toggleFormState();
			});
	}

	public logout() {
		// TODO: smooth redirect
		return this.authService.logout().then(() => this.router.navigateByUrl("/login"));
	}

	public toggleFormState() {
		if (!this.state.edit || this.state.loading)
			this.userForm.disable();
		else
			this.userForm.enable();
	}
}
