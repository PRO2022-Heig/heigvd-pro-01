import { Injectable } from "@angular/core";
import { CookieService as NGXCookieService } from "ngx-cookie-service";

import { TokenResponse } from "../../api/auth/auth.types";

export interface Cookie {
	auth?: TokenResponse
}

@Injectable({
	providedIn: "root"
})
export class CookieService {
	// TODO: behaviorSubject for Cookie?

	private readonly COOKIE_NAME = "fd.data";

	public constructor(private readonly cookieService: NGXCookieService) {
	}

	public exists(): boolean {
		return this.cookieService.check(this.COOKIE_NAME);
	}

	public get(): Cookie {
		if (this.exists()) try {
			const json = JSON.parse(this.cookieService.get(this.COOKIE_NAME));

			const data = this._validate(json);
			if (data)
				return data;
		} catch (e) {
			// do next
		}

		const cookie = this.getInitialCookie();
		this.set(cookie);
		return cookie;
	}

	public set(cookie: Cookie): boolean {
		const _cookie = this._validate(cookie);
		if (_cookie) {
			this.cookieService.set(this.COOKIE_NAME, JSON.stringify(_cookie), {
				path: "/" // TODO: more?
			});

			return true;
		}

		return false;
	}


	/**
	 * Validates content of data according the Cookie (Whitelist)
	 */
	private _validate(cookie: unknown): Cookie | false;
	private _validate(data: Cookie) {
		const cookie = this.getInitialCookie();

		if (data.auth)
			cookie.auth = {
				refresh_token: data.auth.refresh_token,
				token: data.auth.token
			};

		return cookie;
	}

	private getInitialCookie(): Cookie {
		return {};
	}
}
