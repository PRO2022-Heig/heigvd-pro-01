import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ApiModule } from "../api";
import { AuthInterceptor } from "./auth.interceptor";

describe("AuthInterceptor", () => {
	let interceptor: AuthInterceptor;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ApiModule, RouterTestingModule],
			providers: [AuthInterceptor]
		});

		// TODO: https://alligator.io/angular/testing-http-interceptors/ to do better tests?
		interceptor = TestBed.inject(AuthInterceptor);
	});

	it("should be created", () => {
		expect(interceptor).toBeTruthy();
	});
});
