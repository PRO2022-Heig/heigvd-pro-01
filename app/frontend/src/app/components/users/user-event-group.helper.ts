import { ModelId } from "../../api/_lib/model";

import { Event, EventService } from "../../api/event";
import { Group, GroupService } from "../../api/group";
import { GroupUserMembership, GroupUserMembershipService } from "../../api/group_user_memberships";
import { User, UserService } from "../../api/user";

export interface EventHelped extends Event {
	_group: GroupHelped;
}

export interface GroupUserMembershipHelped extends GroupUserMembership {
	_user?: User;
}

export interface GroupHelped extends Group {
	_events: EventHelped[];
	memberships: GroupUserMembershipHelped[];
}

export interface GetAllEventsGroupsServices {
	eventService: EventService;
	groupService: GroupService;
	guMembershipService: GroupUserMembershipService;
	userService: UserService;
}

export interface GetAllEventsGroupsOutput {
	events: EventHelped[];
	groups: GroupHelped[];
}

/**
 * Get all events, groups for the given user
 */
export async function getAllEventsGroups(services: GetAllEventsGroupsServices, user: User): Promise<GetAllEventsGroupsOutput> {
	const {
		eventService,
		groupService,
		guMembershipService,
		userService
	} = services;

	return guMembershipService.find({
		"user.id": user.id
	}).then(_ => _.map(_ => _.__group)).then(async myGroupIds => {
		const groups = await groupService.find<GroupHelped>({id: myGroupIds});

		const [events, memberships] = await Promise.all([
			eventService.find<EventHelped>({
				id: groups.reduce((prev, curr) => prev.concat(curr.__events), [] as ModelId[])
			}),
			guMembershipService.find<GroupUserMembershipHelped>({
				"group.id": myGroupIds
			}).then(async memberships => {
				const users = await userService.find({
					id: Array.from(new Set(memberships.map(_ => _.__user)))
				});

				for (const membership of memberships.sort(_ => _.__user === user.id ? -1 : 1))
					membership._user = users.find(_ => _.id === membership.__user);

				return memberships;
			})
		]);

		for (const event of events)
			event._group = groups.find(_ => _.id === event.__group) as GroupHelped;

		for (const group of groups) {
			group._events = events.filter(_ => _.__group === group.id);
			group.memberships = memberships.filter(_ => _.__group === group.id) || [];
		}

		return {events, groups};
	});
}
