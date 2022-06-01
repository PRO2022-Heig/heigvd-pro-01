import { TestBed } from "@angular/core/testing";

import { ApiModule } from "../api.module";
import {FoodConstraintService} from "./food-constraint.service";

describe("FoodConstraintService", () => {
	let service: FoodConstraintService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule]
		});
		service = TestBed.inject(FoodConstraintService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
