export type ModelId = number;

export interface ModelWithId {
	id: ModelId;
}

export interface Model extends ModelWithId {
	/**
	 * The "entity name"
	 */
	"@id": string;

	createdAt: string;
	updatedAt: string;
}
