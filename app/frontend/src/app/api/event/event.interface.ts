import { Model, ModelId } from "../_lib/model";

export interface Event extends Model {
	name: string;
	description: string;

	group: string;
	__group: ModelId;

	meal?: string;
	__meal?: ModelId;
}
