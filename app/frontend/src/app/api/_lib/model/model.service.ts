import { Injectable } from "@angular/core";

import { RecursivePartial } from "../../../../helpers/types";
import { ApiClientModule } from "../../api-client.module";
import { Model, ModelId, ModelWithId } from "./model.interface";
import { ModelFindResponse, ModelFoundAndPagination, ModelSearch, ModelSearchParams, ModelUpdate } from "./model.types";

@Injectable({
	providedIn: "root"
})
export abstract class ModelService<T extends Model> {
	public abstract readonly entryPoint: string;

	public constructor(protected readonly apiClient: ApiClientModule) {
	}

	/**
	 * Search for data according to the conditions.
	 * @return only the models
	 */
	public find<U extends T = T>(search: ModelSearch<T> = {}, params: ModelSearchParams<T>): Promise<U[]> {
		return this.findAndPagination<U>(search, params).then(res => res.data);
	}

	/**
	 * Search for data according to the conditions.
	 * @return models and pagination
	 */
	public findAndPagination<U extends T = T>(search: ModelSearch<T> = {}, params: ModelSearchParams<T>): Promise<ModelFoundAndPagination<U>> {
		// TODO: search, params, pagination
		return this.apiClient.get<ModelFindResponse<U>>(this.entryPoint)
			.then(res => ({data: res["hydra:member"], pagination: {total: res["hydra:totalItems"]}}));
	}

	/**
	 * Get a single model
	 */
	public get<U extends T = T>(id: ModelId): Promise<U> {
		return this.apiClient.get<U>(`${this.entryPoint}/${id}`);
	}

	/**
	 * Create a model from a partial data
	 */
	public create<U extends T = T>(model: RecursivePartial<T>): Promise<U> {
		return this.apiClient.post<U>(this.entryPoint, model);
	}

	/**
	 * Update a model with partial data
	 */
	public update<U extends T = T>(model: ModelUpdate<T>): Promise<U> {
		return this.apiClient.patch<U>(`${this.entryPoint}/${model.id}`, model);
	}

	/**
	 * Delete a model
	 */
	public delete(id: ModelId | ModelWithId): Promise<void> {
		if ((id as ModelWithId).id)
			id = (id as ModelWithId).id;

		return this.apiClient.delete(`${this.entryPoint}/${id}`);
	}
}
