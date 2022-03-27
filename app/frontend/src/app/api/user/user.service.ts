import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { ModelService } from "../_lib/model";

import { User } from "./user.interface";

export interface AuthUser extends User {
	_connected: boolean;
}

@Injectable({
	providedIn: "root"
})
export class UserService extends ModelService<User> {
	public static tmpLogin = {user: "admin", pass: "password"};

	public readonly entryPoint = "/users";

	private readonly user = new BehaviorSubject<AuthUser>({_connected: false} as AuthUser);

	public getUser(): Observable<AuthUser> {
		return this.user.asObservable();
	}

	// TODO: on a auth service?
	public async login(email: string, password: string): Promise<AuthUser> {
		// TODO
		await new Promise(resolve => setTimeout(resolve, 750));

		const tmpLogin = UserService.tmpLogin;

		if (!(tmpLogin.user === email && tmpLogin.pass === password))
			throw new HttpErrorResponse({status: 401});

		const user: AuthUser = {id: 0, email, _connected: true};
		this.user.next(user);
		return user;
	}

	public async logout() {
		// TODO
		const user = this.user.getValue();
		user._connected = false;
		this.user.next(user);
	}
}
