import { TestBed } from "@angular/core/testing";

import { ApiModule } from "../api.module";
import { HomeMealService } from "./home-meal.service";

describe("HomeMealService", () => {
	let service: HomeMealService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule]
		});
		service = TestBed.inject(HomeMealService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
