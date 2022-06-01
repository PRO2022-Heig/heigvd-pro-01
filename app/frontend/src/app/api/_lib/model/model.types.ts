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

export interface ModelNumberFilter {
	// greater
	gt?: number;
	// greater or equal
	gte?: number;
	// lesser
	lt?: number;
	// lesser or equal
	lte?: number;

	// TODO: add between?
}

export interface ModelSearchParams<T> {
	page?: number;

	// TODO (hypothetical)
	limit?: number;
	skip?: number;
	sort?: ModelSort<T>;
}

// TODO (hypothetical)
type ModelSortValue = 1 | -1;
export type ModelSort<T> = KeysOf<T,  ModelSortValue>;

export type ModelUpdate<T extends Model> = ModelWithId & RecursivePartial<T>;
