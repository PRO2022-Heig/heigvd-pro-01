import { Model, ModelId } from "../_lib/model";

export interface Restaurant extends Model {
	name: string;
	description: string;
	location: string;

	meals: string[];
	__meals: ModelId[]; // decoded
}
