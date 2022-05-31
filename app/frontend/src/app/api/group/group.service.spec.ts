import { TestBed } from "@angular/core/testing";

import { ApiModule } from "../api.module";
import { GroupService } from "./group.service";

describe("GroupService", () => {
	let service: GroupService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule]
		});
		service = TestBed.inject(GroupService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
