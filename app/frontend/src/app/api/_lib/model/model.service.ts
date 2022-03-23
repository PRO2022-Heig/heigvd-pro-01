import { Injectable } from "@angular/core";

import { ApiClientModule } from "../../api-client.module";
import { ModelId } from "./model.interface";

@Injectable({
	providedIn: "root"
})
export abstract class ModelService<T> {
	public abstract readonly entryPoint: string;

	public constructor(protected readonly apiClient: ApiClientModule) {
	}

	public get<U extends T = T>(id: ModelId): Promise<U> {
		return this.apiClient.get<U>(`${this.entryPoint}/${id}`);
	}

	// TODO: add more
}
