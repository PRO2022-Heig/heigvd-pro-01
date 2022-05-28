import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { ApiClientModule } from "../api-client.module";
import { groupDecodeEntityName } from "../group";
import { MealService } from "../meal";
import { Event } from "./event.interface";

@Injectable({
	providedIn: "root"
})
export class EventService extends ModelService<Event> {
	public static readonly ENTRY_POINT = "/events";

	public readonly entryPoint = EventService.ENTRY_POINT;

	public constructor(
		client: ApiClientModule,
		private readonly mealService: MealService
	) {
		super(client);
	}


	protected override _decode(model: Event) {
		Object.defineProperty(model, "__group" as keyof Event, {
			get: () => groupDecodeEntityName(model.group)
		});

		if (model.meal)
			model.__meal = this.mealService.decodeEntityName(model.meal);

		return model;
	}
}
