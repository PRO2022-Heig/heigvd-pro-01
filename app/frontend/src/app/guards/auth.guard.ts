import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";

import { AuthService, AuthUser } from "../api/auth";

@Injectable({
	providedIn: "root"
})
export class AuthGuard implements CanActivate, CanActivateChild {
	private user!: AuthUser;

	public constructor(private readonly authService: AuthService, private readonly router: Router) {
		this.authService.getUser().subscribe(user => this.user = user);
	}

	public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.checkLogin(next, state);
	}

	public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.checkLogin(next, state);
	}

	private async checkLogin(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		if (!this.user._connected)
			await this.redirect(state);

		return this.user._connected;
	}

	private redirect(state: RouterStateSnapshot) {
		return this.router.navigate(["/login"], {queryParams: {redirect: state.url}});
	}
}
