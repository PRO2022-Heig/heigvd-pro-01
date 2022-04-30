import { Model } from "../_lib/model";

export interface User extends Model {
	// TODO: more? (OAuth?)
	emailAddress: string;
	firstName: string;
	lastName: string;
}
