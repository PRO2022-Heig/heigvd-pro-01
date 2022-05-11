export type ModelId = number;

export interface ModelWithId {
	id: ModelId;
}

export interface Model extends ModelWithId {
	createdAt: string;
	updatedAt: string;
}
