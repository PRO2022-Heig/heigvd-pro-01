import { Model, ModelId } from "../_lib/model";

export interface GroupUserMembership extends Model {
	isAdmin: boolean;

	group: string;
	user: string;

	__group: ModelId;
	__user: ModelId;
}
