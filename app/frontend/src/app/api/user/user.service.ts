import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { User } from "./user.interface";

@Injectable({
	providedIn: "root"
})
export class UserService extends ModelService<User> {
	public static readonly ENTRY_POINT = "/app_users";

	public readonly entryPoint = UserService.ENTRY_POINT;

	/**
	 * Get the connected user.
	 * @warning Use the AuthService, so it is managed with the session.
	 */
	public _loadConnected<U extends User = User>() {
		return this.apiClient.get<U>(`${this.entryPoint}/mi`);
	}
}
