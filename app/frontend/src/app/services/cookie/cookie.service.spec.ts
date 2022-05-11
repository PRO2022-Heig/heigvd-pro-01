import { TestBed } from "@angular/core/testing";

import { Cookie, CookieService } from "./cookie.service";

interface CookieTest extends Cookie {
	test: string;
}

describe("CookieService", () => {
	let service: CookieService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CookieService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	describe("read/write", () => {
		it("should write only valid cookie data", () => {
			const cookie: CookieTest = {
				auth: {
					refresh_token: "123",
					token: "abc"
				},
				test: "abc"
			};
			expect(service.set(cookie)).toBe(true);

			const stored = service.get() as CookieTest;
			expect(stored.test).toBeUndefined();
		});
	});
});
