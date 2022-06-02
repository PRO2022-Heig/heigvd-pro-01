import { TestBed } from "@angular/core/testing";

import { ApiModule } from "../api.module";
import { IngredientService } from "./ingredient.service";

describe("IngredientService", () => {
	let service: IngredientService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule]
		});
		service = TestBed.inject(IngredientService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
