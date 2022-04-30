import { User, UserService } from "../../../../src/app/api/user";
import { ModelHttpHandler } from "./model.http-handler";

export class UserHttpHandler extends ModelHttpHandler<User> {
	public override canHandle(url: string): boolean {
		return super.canHandle(url) || url.startsWith("/app_user"); // TODO: fix
	}

	protected override getEntryPoint(): string {
		return UserService.ENTRY_POINT;
	}

	protected override verifyCreate(data: unknown): number | User {
		// TODO: better
		if (!data)
			return 400;

		return data as User;
	}

	protected override verifyUpdate(data: unknown, stored: User): number | User {
		// TODO: better
		return stored;
	}
}
