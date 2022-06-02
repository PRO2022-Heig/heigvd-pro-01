import { User, UserService } from "../../../../src/app/api/user";
import { ModelHttpHandler } from "./model.http-handler";

export class UserHttpHandler extends ModelHttpHandler<User> {
	protected override getEntryPoint(): string {
		return UserService.ENTRY_POINT;
	}

	protected override verifyCreate(data: unknown): number | User {
		if (!data)
			return 400;

		// TODO: better
		const mail = (data as User).emailAddress;
		if (mail && this.mocks.find(_ => _.emailAddress === mail))
			return 409;

		return data as User;
	}

	protected override verifyUpdate(data: unknown, stored: User): number | User {
		// TODO: better
		return stored;
	}

	protected override canDelete(): boolean {
		// TODO: better
		return true;
	}
}
