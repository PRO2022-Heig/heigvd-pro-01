import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

import { DummyComponentTest } from "../../../test/helpers";
import { ApiInterceptorTestProvider } from "../../../test/helpers/api";
import { users } from "../../../test/mocks/api";
import { ApiModule } from "../api";
import { AuthService } from "../api/auth";
import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
	const routeProtected = "abc";
	const routeUnprotected = "def";
	const routeLogin = "login";

	const urlProtected = `/${routeProtected}`;
	const urlUnprotected = `/${routeUnprotected}`;
	const urlLogin = `/${routeLogin}`;

	let guard!: AuthGuard;
	let router!: Router;
	let service!: AuthService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				ApiModule,
				RouterTestingModule.withRoutes([{
					component: DummyComponentTest,
					path: routeLogin
				}, {
					canActivate: [AuthGuard],
					component: DummyComponentTest,
					path: routeProtected
				}, {
					component: DummyComponentTest,
					path: routeUnprotected
				}])
			],
			providers: [AuthGuard, ApiInterceptorTestProvider]
		});

		guard = TestBed.inject(AuthGuard);
		router = TestBed.inject(Router);
		service = TestBed.inject(AuthService);
	});

	it("should be defined", () => {
		expect(guard).toBeTruthy();
		expect(service).toBeTruthy();
	});

	describe("activation", () => {
		beforeEach(() => {
			return router.navigate([routeUnprotected]);
		});

		it("should not activate (redirect to login)", async () => {
			expect(router.url).toBe(urlUnprotected);

			expect(await router.navigate([routeProtected]))
				.toBe(false);
			expect(router.url).toBe(`${urlLogin}?redirect=%2F${routeProtected}`);

			expect(await guard.canActivate(router.routerState.snapshot.root, router.routerState.snapshot))
				.toBe(false);

			expect(router.url.startsWith(urlLogin)).toBe(true);
		});

		it("should activate", async () => {
			expect(router.url).toBe(urlUnprotected);

			const user = users[0];
			await service.login(user.emailAddress, user.password);

			expect(await router.navigate([routeProtected]))
				.toBe(true);
			expect(await guard.canActivate(router.routerState.snapshot.root, router.routerState.snapshot))
				.toBe(true);

			expect(router.url).toBe(urlProtected);
		});
	});
});
