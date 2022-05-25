import { TestBed } from "@angular/core/testing";

import { ApiModule } from "../api.module";
import { GroupUserMembershipsService } from "./group-user-memberships.service";

describe("GroupUserMembershipsService", () => {
	let service: GroupUserMembershipsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule]
		});
		service = TestBed.inject(GroupUserMembershipsService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
