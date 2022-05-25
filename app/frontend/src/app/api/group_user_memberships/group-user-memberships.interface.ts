import { Model } from "../_lib/model";

export interface GroupUserMemberships extends Model {
	isAdmin: boolean;

	group: string;
	user: string;
}
