import { EventService } from "../../../src/app/api/event";
import { Group, GroupService } from "../../../src/app/api/group";

export const groups: Group[] = [{
	"@id": `${GroupService.ENTRY_POINT}/1`,
	id: 1,
	name: "Group1",
	events: [`${EventService.ENTRY_POINT}/1`, `${EventService.ENTRY_POINT}/2`],
	__events: [1, 2],
	createdAt: new Date(2020, 10, 10, 10, 0, 0).toISOString(),
	updatedAt: new Date(2020, 11, 10, 10, 0, 0).toISOString()
}, {
	"@id": `${GroupService.ENTRY_POINT}/2`,
	id: 2,
	name: "Group2",
	events: [],
	__events: [],
	createdAt: new Date(2020, 10, 10, 10, 0, 0).toISOString(),
	updatedAt: new Date(2020, 11, 10, 10, 0, 0).toISOString()
}];
