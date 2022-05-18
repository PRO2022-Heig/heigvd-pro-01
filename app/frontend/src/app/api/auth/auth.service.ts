import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { CookieService } from "../../services/cookie";
import { ApiClientModule } from "../api-client.module";
import { User, UserService } from "../user";
import { AuthUser, TokenResponse } from "./auth.types";

export interface UserSignup extends Pick<User, "emailAddress" | "firstName" | "lastName"> {
	password: string;
}

@Injectable({
	providedIn: "root"
})
export class AuthService {
	public static readonly ENTRY_POINT = "/token";

	public readonly entryPoint = AuthService.ENTRY_POINT;

	private user: BehaviorSubject<AuthUser> = new BehaviorSubject<AuthUser>({_connected: false} as AuthUser);

	public constructor(
		private readonly apiClient: ApiClientModule,
		private readonly userService: UserService,
		private readonly cookieService: CookieService) {
	}

	/**
	 * Return connected user (if logout => persistent data (username))
	 */
	public getUser(): Observable<AuthUser> {
		return this.user.asObservable();
	}

	/**
	 * Is the cookie stored. (Useful after the page has been refreshed)
	 */
	public hasAuthCookie(): boolean {
		return !!this.cookieService.get().auth;
	}

	/**
	 * Set the user as disconnected (!= logout)
	 * @param {boolean} persistent
	 */
	public disconnectUser(persistent = true) {
		if (persistent)
			// TODO: is the observable updated?
			this.user.value._connected = false;
		else
			this.user.next({_connected: false} as AuthUser);
	}

	/**
	 * Return connected user (from session)
	 */
	public getConnected(): Promise<User> {
		return this.afterTokenAction(this.userService._loadConnected<AuthUser>());
	}

	/**
	 * Create the user then login
	 * @param data
	 */
	public signup(data: UserSignup) {
		// TODO: change if a double factor is implemented (ex: confirmation mail)
		return this.userService.create(data).then(user => this.login(user.emailAddress, data.password));
	}

	/**
	 * Login a user
	 * @return the logged user
	 */
	public login(email: string, password: string): Promise<User> {
		return this.apiClient.post<TokenResponse>(`${this.entryPoint}/get`, {
			emailAddress: email,
			password
		}).then(res => {
			const cookie = this.cookieService.get();
			cookie.auth = {
				token: res.token,
				refresh_token: res.refresh_token
			};
			this.cookieService.set(cookie);

			return this.getConnected();
		});
	}

	/**
	 * Disconnect user
	 */
	public async logout() {
		const cookie = this.cookieService.get();
		cookie.auth = undefined;
		this.cookieService.set(cookie);

		this.disconnectUser();
	}

	/**
	 * Refresh the current session
	 */
	public _refresh() {
		const cookie = this.cookieService.get();

		return this.afterTokenAction(this.apiClient.post<TokenResponse>(`${this.entryPoint}/refresh`, {
			refresh_token: cookie.auth?.refresh_token
		} as Pick<TokenResponse, "refresh_token">).then(res => {
			cookie.auth = {
				token: res.token,
				refresh_token: res.refresh_token
			};
			this.cookieService.set(cookie);

			return this.user.getValue();
		}));
	}

	/**
	 * Update the date of the check and clear the cookie if the token has expired
	 */
	private afterTokenAction(action: Promise<AuthUser>) {
		return action.then(user => {
			user._connected = true;
			user._checked_at = new Date();
			this.user.next(user);

			return user as User;
		}).catch(async (error: HttpErrorResponse) => {
			if (error.status === 401)
				await this.logout();

			throw error;
		});
	}
}
