import { Model, ModelId } from "../_lib/model";

export interface Step extends Model {
	action: string;
	number: number;

	recipe: string;
	__recipe: ModelId; // decoded
}
