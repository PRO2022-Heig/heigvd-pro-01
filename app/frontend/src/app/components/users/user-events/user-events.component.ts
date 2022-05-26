import { Component, OnInit } from "@angular/core";

import { BaseComponent } from "../../_lib/_basics";

import { AuthService } from "../../../api/auth";
import { User } from "../../../api/user";

@Component({
	selector: "app-user-events",
	templateUrl: "./user-events.component.html",
	styleUrls: ["./user-events.component.scss"]
})
export class UserEventsComponent extends BaseComponent implements OnInit {
	private user!: User;

	public constructor(private readonly authService: AuthService) {
		super();
	}

	public ngOnInit(): void {
		this.addSubscriptions(
			// The user is logged in, otherwise the authentication guard would have redirected the page.
			this.authService.getUser().subscribe(_ => this.user = _)
		);
	}
}
