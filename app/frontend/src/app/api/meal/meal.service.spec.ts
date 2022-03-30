import { TestBed } from "@angular/core/testing";

import { ApiModule } from "../api.module";
import { MealService } from "./meal.service";

describe("MealService", () => {
	let service: MealService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule]
		});
		service = TestBed.inject(MealService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
