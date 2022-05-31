import { KeysOf, RecursivePartial } from "../../../../helpers/types";
import {Model, ModelId, ModelWithId} from "./model.interface";

export interface ModelFindResponse<T> {
	// TODO: watch for field change
	"hydra:member": T[];
	"hydra:totalItems": number;
}

export interface ModelFoundAndPagination<T> {
	data: T[];
	pagination: {
		// TODO: Range? (calculated with limit?)
		total: number;
	};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ModelSearch<T> {
	id?: ModelId[];

	// TODO: more
}

export interface ModelSearchParams<T> {
	limit?: number;
	skip?: number;
	// TODO (hypothetical)
	sort?: ModelSort<T>;
}

// TODO (hypothetical)
type ModelSortValue = 1 | -1;
export type ModelSort<T> = KeysOf<T,  ModelSortValue>;

export type ModelUpdate<T extends Model> = ModelWithId & RecursivePartial<T>;
