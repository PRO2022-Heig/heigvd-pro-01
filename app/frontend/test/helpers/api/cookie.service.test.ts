import { Injectable, Provider } from "@angular/core";

import { Cookie, CookieService } from "../../../src/app/services/cookie";

// TODO: not in api directory?

@Injectable()
export class CookieServiceTest extends CookieService {
	private _cookie: Cookie = this.getInitialCookie();

	public override get(): Cookie {
		return this._cookie;
	}

	public override set(cookie: Cookie): boolean {
		this._cookie = cookie;
		return true;
	}

	public override reset() {
		this._cookie = this.getInitialCookie();
	}
}

export const CookieServiceTestProvider: Provider = {
	provide: CookieService,
	useClass: CookieServiceTest
};
