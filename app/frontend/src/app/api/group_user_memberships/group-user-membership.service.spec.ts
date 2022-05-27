import { TestBed } from "@angular/core/testing";

import { ApiModule } from "../api.module";
import { GroupUserMembershipService } from "./group-user-membership.service";

describe("GroupUserMembershipService", () => {
	let service: GroupUserMembershipService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule]
		});
		service = TestBed.inject(GroupUserMembershipService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
