import { Component } from "@angular/core";

import { BaseComponent } from "../../_lib/_basics";

import { AuthService } from "../../../api/auth";
import { User } from "../../../api/user";

@Component({
	selector: "app-user-profile",
	templateUrl: "./user-profile.component.html",
	styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent extends BaseComponent {
	// TODO

	public user!: User;

	public constructor(private readonly authService: AuthService) {
		super();
	}

	public ngOnInit(): void {
		this.addSubscriptions(
			this.authService.getUser().subscribe(user => this.user = user)
		);
	}
}
