import { TestBed } from "@angular/core/testing";

import { ApiModule } from "../api.module";
import { RecipeService } from "./recipe.service";

describe("RecipeService", () => {
	let service: RecipeService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule]
		});
		service = TestBed.inject(RecipeService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
