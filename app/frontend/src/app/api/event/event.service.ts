import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { Event } from "./event.interface";

@Injectable({
	providedIn: "root"
})
export class EventService extends ModelService<Event> {
	public static readonly ENTRY_POINT = "/events";

	public readonly entryPoint = EventService.ENTRY_POINT;
}
