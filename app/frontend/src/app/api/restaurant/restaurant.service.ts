import { Injectable } from "@angular/core";

import { ModelId, ModelService } from "../_lib/model";
import { ModelSearch } from "../_lib/model/model.types";

import { ApiClientModule } from "../api-client.module";
import { RestaurantMealService } from "../restaurant-meal";
import { RESTAURANT_ENTRY_POINT } from "./restaurant.constants";
import { Restaurant } from "./restaurant.interface";

export interface RestaurantSearch extends ModelSearch<Restaurant>, Partial<Pick<Restaurant, "name" | "description" | "location">> {
	"meals.id"?: ModelId | ModelId[];
}

@Injectable({
	providedIn: "root"
})
export class RestaurantService extends ModelService<Restaurant, RestaurantSearch> {
	public static readonly ENTRY_POINT = RESTAURANT_ENTRY_POINT;

	public readonly entryPoint = RestaurantService.ENTRY_POINT;

	public constructor(
		client: ApiClientModule,
		private readonly restaurantMealService: RestaurantMealService) {
		super(client);
	}

	protected override _decode(model: Restaurant) {
		Object.defineProperty(model, "__meals" as keyof Restaurant, {
			get: () => model.meals.map(_ => this.restaurantMealService.decodeEntityName(_))
		});

		return model;
	}
}
