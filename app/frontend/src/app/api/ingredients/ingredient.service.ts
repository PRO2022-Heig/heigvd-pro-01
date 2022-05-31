import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { ApiClientModule } from "../api-client.module";
import { FoodConstraintService } from "../food-constraint";
import { ProductService } from "../product";
import { Ingredient } from "./ingredient.interface";

@Injectable({
	providedIn: "root"
})
export class IngredientService extends ModelService<Ingredient> {
	public static readonly ENTRY_POINT = "/ingredients";

	public readonly entryPoint = IngredientService.ENTRY_POINT;

	public constructor(
		client: ApiClientModule,
		private readonly foodConstraintService: FoodConstraintService,
		private readonly productService: ProductService) {
		super(client);
	}

	public override _decode(model: Ingredient) {
		Object.defineProperty(model, "__foodConstraints" as keyof Ingredient, {
			get: () => model.foodConstraints.map(_ => this.foodConstraintService.decodeEntityName(_))
		});

		Object.defineProperty(model, "__products" as keyof Ingredient, {
			get: () => model.products.map(_ => this.productService.decodeEntityName(_))
		});

		return model;
	}
}
