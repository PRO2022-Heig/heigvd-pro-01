import { Model } from "../_lib/model";

export interface Product extends Model {
	name: string;
	reference: string;

	imageUrl?: string;

	// TODO: these values are (probably) nested
	ingredient?: unknown;
	foodConstraints: Array<unknown>;
	provider?: unknown;
}
