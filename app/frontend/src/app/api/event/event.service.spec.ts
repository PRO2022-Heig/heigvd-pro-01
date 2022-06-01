import { TestBed } from "@angular/core/testing";

import { ApiModule } from "../api.module";
import { EventService } from "./event.service";

describe("EventService", () => {
	let service: EventService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule]
		});
		service = TestBed.inject(EventService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
