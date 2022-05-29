import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { groupDecodeEntityName } from "../group";
import { Event } from "./event.interface";

@Injectable({
	providedIn: "root"
})
export class EventService extends ModelService<Event> {
	public static readonly ENTRY_POINT = "/events";

	public readonly entryPoint = EventService.ENTRY_POINT;

	protected override _decode(model: Event) {
		Object.defineProperty(model, "__group" as keyof Event, {
			get: () => groupDecodeEntityName(model.group)
		});

		if (model.meal) // TODO: better
			model.__meal = +model.meal.split("/")[2];

		return model;
	}
}
