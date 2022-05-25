import { Model } from "../_lib/model";

export interface Event extends Model {
	name: string;
	description: string;

	meal: string;
}
