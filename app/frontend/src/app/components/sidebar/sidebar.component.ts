import { Component, OnInit } from "@angular/core";
import { AuthService, AuthUser } from "../../api/auth";
import { BaseComponent } from "../_lib/_basics";

@Component({
	selector: "app-sidebar",
	styleUrls: ["./sidebar.component.scss"],
	templateUrl: "./sidebar.component.html"
})
export class SidebarComponent extends BaseComponent implements OnInit {
	public user!: AuthUser;

	public constructor(private readonly authService: AuthService) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.authService.getUser().subscribe(user => this.user = user)
		);
	}
}
