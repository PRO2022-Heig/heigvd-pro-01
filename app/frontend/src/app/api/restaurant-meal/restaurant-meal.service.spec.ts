import { TestBed } from "@angular/core/testing";

import { ApiModule } from "../api.module";
import { RestaurantMealService } from "./restaurant-meal.service";

describe("RestaurantMealService", () => {
	let service: RestaurantMealService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule]
		});
		service = TestBed.inject(RestaurantMealService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
