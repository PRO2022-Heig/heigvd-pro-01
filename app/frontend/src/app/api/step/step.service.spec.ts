import { TestBed } from "@angular/core/testing";

import { ApiModule } from "../api.module";
import {StepService} from "./step.service";

describe("StepService", () => {
	let service: StepService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule]
		});
		service = TestBed.inject(StepService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
