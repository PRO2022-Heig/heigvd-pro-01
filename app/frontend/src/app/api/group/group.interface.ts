import { Model, ModelId } from "../_lib/model";

export interface Group extends Model {
	name: string;

	events: string[];
	__events: ModelId[];
}
