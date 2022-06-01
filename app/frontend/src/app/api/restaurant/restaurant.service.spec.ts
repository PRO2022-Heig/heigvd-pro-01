import { TestBed } from "@angular/core/testing";

import { ApiModule } from "../api.module";
import { RestaurantService } from "./restaurant.service";

describe("RestaurantService", () => {
	let service: RestaurantService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule]
		});
		service = TestBed.inject(RestaurantService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
