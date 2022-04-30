import { HttpErrorResponse } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

import { ApiTestProviders } from "../../../../test/helpers/api";
import { users } from "../../../../test/mocks/api";
import { CookieService } from "../../services/cookie";
import { ApiClientModule } from "../api-client.module";
import { AuthService, UserSignup } from "./auth.service";
import { AuthUser } from "./auth.types";

describe("AuthService", () => {
	let service: AuthService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiClientModule],
			providers: [...ApiTestProviders]
		});

		service = TestBed.inject(AuthService);
		TestBed.inject(CookieService).reset();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should fail login and refresh then log and return connected", async () => {
		const user = users[0];
		await service.login(`${user.emailAddress}a`, user.password)
			.catch((error: HttpErrorResponse) => expect(error.status).toBe(401));

		await service._refresh()
			.catch((error: HttpErrorResponse) => expect(error.status).toBe(401));

		const logged = await service.login(user.emailAddress, user.password);
		expect(logged.id).toBe(user.id);
		expect(logged.emailAddress).toBe(user.emailAddress);

		const refreshed = await service._refresh();
		expect(refreshed.id).toBe(user.id);
		expect(refreshed.emailAddress).toBe(user.emailAddress);
	});

	it("should signup then logout (verify observable too)", async () => {
		let user!: AuthUser;
		service.getUser().subscribe(_user => user = _user);

		expect(user._connected).toBe(false);

		const userSignup: UserSignup = {
			emailAddress: "abc@def.gh",
			password: "password",
			firstName: "first",
			lastName: "last"
		};

		const created = await service.signup(userSignup);
		expect(user._connected).toBe(true);
		expect(created.firstName).toBe(user.firstName);
		expect(userSignup.lastName).toBe(user.lastName);

		await service.logout();
		expect(user._connected).toBe(false);
	});
});
