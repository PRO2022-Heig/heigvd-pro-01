import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { ApiClientModule } from "../api-client.module";
import { EventService } from "../event";
import { GROUPS_ENTRY_POINT } from "./group.constants";
import { Group } from "./group.interface";

@Injectable({
	providedIn: "root"
})
export class GroupService extends ModelService<Group> {
	public static readonly ENTRY_POINT = GROUPS_ENTRY_POINT;

	public readonly entryPoint = GroupService.ENTRY_POINT;

	public constructor(
		client: ApiClientModule,
		private readonly eventService: EventService
	) {
		super(client);
	}

	protected override _decode(model: Group) {
		Object.defineProperty(model, "__events" as keyof Group, {
			get: () => model.events.map(_ => this.eventService.decodeEntityName(_))
		});

		return model;
	}
}
