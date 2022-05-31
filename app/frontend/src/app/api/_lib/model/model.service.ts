import { Injectable } from "@angular/core";

import { RecursivePartial } from "../../../../helpers/types";
import { ApiClientModule } from "../../api-client.module";
import { Model, ModelId, ModelWithId } from "./model.interface";
import { ModelFindResponse, ModelFoundAndPagination, ModelSearch, ModelSearchParams, ModelUpdate } from "./model.types";

@Injectable({
	providedIn: "root"
})
export abstract class ModelService<T extends Model, MS = ModelSearch<T>> {
	/**
	 * Convert {name: {fr: {text: 1}, en: false}} => name[fr][text]=1&name[en]=false&
	 * @param object to convert
	 * @returns {string}
	 */
	public static toHttpQueryString(object: unknown): string {
		let query = this._toHttpQueryString(object as object);

		if (query.length) // remove '?'
			query = query.slice(0, -1);
		return query;
	}

	/**
	 * Convert {name: {fr: {text: 1}, en: false}} => name[fr][text]=1&name[en]=false&
	 * @param object to convert
	 * @param {string} _key used only for recursion
	 * @returns {string}
	 */
	private static _toHttpQueryString(object: object, _key = ""): string {
		let query = "";

		for (let key of Object.keys(object)) {
			const value = (object as Record<string, unknown>)[key];

			if (_key !== "")
				key = `${_key}[${key}]`;

			query += value instanceof Object
				? this._toHttpQueryString(value, key)
				: `${key}=${value}&`;
		}

		return query;
	}

	public abstract readonly entryPoint: string;

	public constructor(protected readonly apiClient: ApiClientModule) {
	}

	/**
	 * "Encode" an id to the backend entity name (=> @id).
	 * ex: id=4 and <entity>=user => /user/4
	 * @param id
	 */
	public encodeEntityName(id: ModelId | ModelWithId): string {
		if (isNaN(<number>id) && "id" as keyof ModelWithId in (id as ModelWithId))
			id = (id as ModelWithId).id;

		return `${this.entryPoint}/${id}`;
	}

	public decodeEntityName(name: string): ModelId {
		return +name.substring(this.entryPoint.length + 1);
	}

	/**
	 * Search for data according to the conditions.
	 * @return only the models
	 */
	public find<U extends T = T>(search?: MS, params: ModelSearchParams<T> = {}): Promise<U[]> {
		return this.findAndPagination<U>(search, params).then(res => res.data);
	}

	/**
	 * Search for data according to the conditions.
	 * @return models and pagination
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public findAndPagination<U extends T = T>(search?: MS, params: ModelSearchParams<T> = {}): Promise<ModelFoundAndPagination<U>> {
		// TODO: params, pagination

		let url = this.entryPoint;
		if (search && Object.keys(search).length)
			url+= `?${ModelService.toHttpQueryString(search)}`;

		return this.apiClient.get<ModelFindResponse<U>>(url).then(res => ({
			data: res["hydra:member"].map(_ => this._decode(_) as U || _),
			pagination: {total: res["hydra:totalItems"]}
		}));
	}

	/**
	 * Get a single model
	 */
	public get<U extends T = T>(id: ModelId): Promise<U> {
		return this.apiClient.get<U>(`${this.entryPoint}/${id}`)
			.then(_ => this._decode(_) as U || _);
	}

	/**
	 * Create a model from a partial data
	 */
	public create<U extends T = T>(model: RecursivePartial<T>): Promise<U> {
		return this.apiClient.post<U>(this.entryPoint, model)
			.then(_ => this._decode(_) as U || _);
	}

	/**
	 * Update a model with partial data
	 */
	public update<U extends T = T>(model: ModelUpdate<T>): Promise<U> {
		return this.apiClient.patch<U>(`${this.entryPoint}/${model.id}`, model, {
			headers: {
				"Content-Type": "application/merge-patch+json"
			}
		}).then(_ => this._decode(_) as U || _);
	}

	/**
	 * Delete a model
	 */
	public delete(id: ModelId | ModelWithId): Promise<void> {
		if ((id as ModelWithId).id)
			id = (id as ModelWithId).id;

		return this.apiClient.delete(`${this.entryPoint}/${id}`);
	}

	/**
	 * Use this to "decode" a result.
	 * Ex: the relations are in string -> convert to number
	 */
	public abstract _decode(model: T): T | undefined | void;
}
