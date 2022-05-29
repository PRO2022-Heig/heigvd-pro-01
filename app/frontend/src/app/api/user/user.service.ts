import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";
import { ModelSearch } from "../_lib/model/model.types";

import { User } from "./user.interface";

export interface UserSearch extends ModelSearch<User> {
	emailAddress?: string;
	firstName?: string;
	lastName?: string;
}

@Injectable({
	providedIn: "root"
})
export class UserService extends ModelService<User, UserSearch> {
	public static readonly ENTRY_POINT = "/app_users";

	public readonly entryPoint = UserService.ENTRY_POINT;

	/**
	 * Get the connected user.
	 * @warning Use the AuthService, so it is managed with the session.
	 */
	public _loadConnected<U extends User = User>() {
		return this.apiClient.get<U>(`${this.entryPoint}/mi`);
	}

	protected override _decode(model: User) {
		model.id = this.decodeEntityName(model["@id"]);

		return model;
	}
}
