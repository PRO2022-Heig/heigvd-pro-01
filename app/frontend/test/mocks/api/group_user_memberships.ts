import { GroupService } from "../../../src/app/api/group";
import { GroupUserMembership, GroupUserMembershipService } from "../../../src/app/api/group_user_memberships";
import { UserService } from "../../../src/app/api/user";

export const group_user_memberships: GroupUserMembership[] = [{
	"@id": `${GroupUserMembershipService.ENTRY_POINT}/1`,
	id: 1,

	group: `${GroupService.ENTRY_POINT}/1`,
	user: `${UserService.ENTRY_POINT}/1`,
	__group: 1,
	__user: 1,
	isAdmin: true,

	createdAt: new Date(2020, 10, 10, 10, 0, 0).toISOString(),
	updatedAt: new Date(2020, 11, 10, 10, 0, 0).toISOString()
}, {
	"@id": `${GroupUserMembershipService.ENTRY_POINT}/2`,
	id: 2,

	group: `${GroupService.ENTRY_POINT}/1`,
	user: `${UserService.ENTRY_POINT}/2`,
	__group: 1,
	__user: 2,
	isAdmin: false,

	createdAt: new Date(2020, 10, 10, 10, 0, 0).toISOString(),
	updatedAt: new Date(2020, 11, 10, 10, 0, 0).toISOString()
}, {
	"@id": `${GroupUserMembershipService.ENTRY_POINT}/3`,
	id: 3,

	group: `${GroupService.ENTRY_POINT}/2`,
	user: `${UserService.ENTRY_POINT}/1`,
	__group: 2,
	__user: 1,
	isAdmin: true,

	createdAt: new Date(2020, 10, 10, 10, 0, 0).toISOString(),
	updatedAt: new Date(2020, 11, 10, 10, 0, 0).toISOString()
}];
