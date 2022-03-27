import { TestBed } from "@angular/core/testing";

import { ApiModule } from "../api.module";
import { UserService } from "./user.service";

describe("UserService", () => {
	let service: UserService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule]
		});
		service = TestBed.inject(UserService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
