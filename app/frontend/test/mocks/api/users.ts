import { User, UserService } from "../../../src/app/api/user";

export interface UserTest extends User {
	password: string;
}

export const users: UserTest[] = [{
	"@id": `${UserService.ENTRY_POINT}/1`,
	id: 1,
	createdAt: new Date(2020, 10, 10, 10, 0, 0).toISOString(),
	updatedAt: new Date(2020, 11, 10, 10, 0, 0).toISOString(),

	emailAddress: "user.test1@address.mail",
	firstName: "user",
	lastName: "test2",
	password: "password"
}, {
	"@id": `${UserService.ENTRY_POINT}/2`,
	id: 2,
	createdAt: new Date(2020, 11, 10, 10, 0, 0).toISOString(),
	updatedAt: new Date(2020, 12, 10, 10, 0, 0).toISOString(),

	emailAddress: "user.test2@address.mail",
	firstName: "user",
	lastName: "test2",
	password: "password"
}];
