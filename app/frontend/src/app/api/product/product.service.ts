import { Injectable } from "@angular/core";

import { ModelId, ModelService } from "../_lib/model";
import { ModelSearch } from "../_lib/model/model.types";

import { Product } from "./product.interface";

export interface ProductSearch extends ModelSearch<Product>, Partial<Pick<Product, "name" | "reference">> {
	"ingredient.id"?: ModelId | ModelId[];
}

@Injectable({
	providedIn: "root"
})
export class ProductService extends ModelService<Product, ProductSearch> {
	public static readonly ENTRY_POINT = "/products";

	public readonly entryPoint = ProductService.ENTRY_POINT;

	public override _decode() {
		// Do nothing
	}
}
