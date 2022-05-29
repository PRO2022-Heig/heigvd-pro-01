import { Event } from "../../../../src/app/api/event";
import { EventService } from "../../../../src/app/api/event";
import { ModelHttpHandler } from "./model.http-handler";

export class EventHttpHandler extends ModelHttpHandler<Event> {
	protected override getEntryPoint(): string {
		return EventService.ENTRY_POINT;
	}

	protected verifyCreate(data: unknown): number | Event {
		if (!data)
			return 400;

		return data as Event;
	}

	protected verifyUpdate(data: unknown, stored: Event): number | Event {
		// TODO: better
		return stored;
	}

	protected override canDelete(): boolean {
		// TODO: better
		return true;
	}
}
