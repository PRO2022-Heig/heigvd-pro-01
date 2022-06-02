import { TestBed } from "@angular/core/testing";

import { ApiModule } from "../api.module";
import { ProductService } from "./product.service";

describe("ProductService", () => {
	let service: ProductService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule]
		});
		service = TestBed.inject(ProductService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
