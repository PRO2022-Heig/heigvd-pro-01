import { Event, EventService } from "../../../src/app/api/event";
import { GroupService } from "../../../src/app/api/group";
import { MealService } from "../../../src/app/api/meal";

export const events: Event[] = [{
	"@id": `${EventService.ENTRY_POINT}/1`,
	id: 1,
	name: "event1",
	description: "some text",

	group: `${GroupService.ENTRY_POINT}/1`,
	__group: 1,

	meal: undefined,
	__meal: undefined,

	createdAt: new Date(2020, 10, 10, 10, 0, 0).toISOString(),
	updatedAt: new Date(2020, 11, 10, 10, 0, 0).toISOString()
}, {
	"@id": `${EventService.ENTRY_POINT}/2`,
	id: 2,
	name: "event2",
	description: "some text",

	group: `${GroupService.ENTRY_POINT}/1`,
	__group: 1,

	meal: `${MealService.ENTRY_POINT}/1`,
	__meal: 1,

	createdAt: new Date(2020, 10, 10, 10, 0, 0).toISOString(),
	updatedAt: new Date(2020, 11, 10, 10, 0, 0).toISOString()
}];
