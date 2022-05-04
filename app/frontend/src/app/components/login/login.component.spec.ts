import { HttpErrorResponse } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

import { DummyComponentTest } from "../../../../test/helpers";
import { ApiTestProviders } from "../../../../test/helpers/api";
import { users } from "../../../../test/mocks/api";
import { sleep } from "../../../helpers";
import { ApiModule } from "../../api";
import { AuthService } from "../../api/auth";
import { MaterialsModule } from "../../modules";
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
	const pMatError = "form p mat-error";

	async function cleanAuth() {
		await TestBed.inject(AuthService).logout();

		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		compiled = fixture.nativeElement as HTMLElement;
	}

	let compiled: HTMLElement;
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LoginComponent],
			imports: [ApiModule, MaterialsModule, RouterTestingModule.withRoutes([{
				component: DummyComponentTest,
				path: "profile"
			}])],
			providers: [...ApiTestProviders]
		})
			.compileComponents();

		await cleanAuth();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should change login/signup state and name form on button click", async () => {
		expect(compiled.querySelectorAll("form input")).toHaveSize(2);
		expect(compiled.querySelector("mat-card mat-card-header mat-card-title")?.textContent).toContain("Connexion");
		expect(component.state.signup).toBe(false);
		expect(component.loginForm.controls.lastname.validator).toBeNull();

		component.toggleSignup();
		fixture.detectChanges();

		expect(compiled.querySelectorAll("form input")).toHaveSize(4);
		expect(compiled.querySelector("mat-card mat-card-header mat-card-title")?.textContent).toContain("Créer un compte");
		expect(component.state.signup).toBe(true);
		expect(component.loginForm.controls.lastname.validator).toBeDefined();
	});

	describe("form validation", () => {
		it("should be invalid on login", () => {
			if (component.state.signup)
				component.toggleSignup();

			const form = component.loginForm;
			const ctrlMail = form.controls.email;
			const ctrlPass = form.controls.password;

			ctrlMail.setValue("");
			ctrlPass.setValue("");

			expect(form.valid).toBe(false);
			expect(ctrlMail.errors?.required).toBeDefined();
			expect(ctrlPass.errors?.required).toBeDefined();

			ctrlMail.setValue("nomail");
			ctrlPass.setValue("");

			expect(form.valid).toBe(false);
			expect(ctrlMail.errors?.email).toBeDefined();
			expect(ctrlPass.errors?.required).toBeDefined();

			ctrlMail.setValue("");
			ctrlPass.setValue("pppsd");

			expect(form.valid).toBe(false);
			expect(ctrlMail.errors?.required).toBeDefined();
			expect(ctrlPass.errors).toBeNull();

			ctrlMail.setValue("valid@mail.ch");
			ctrlPass.setValue("");

			expect(form.valid).toBe(false);
			expect(ctrlMail.errors).toBeNull();
			expect(ctrlPass.errors?.required).toBeDefined();
		});

		it("should be valid on login", () => {
			if (component.state.signup)
				component.toggleSignup();

			const form = component.loginForm;
			const ctrlMail = form.controls.email;
			const ctrlPass = form.controls.password;

			ctrlMail.setValue("valid@mail.ch");
			ctrlPass.setValue("pa$$w0rd");

			expect(form.valid).toBe(true);
			expect(ctrlMail.errors).toBeNull();
			expect(ctrlPass.errors).toBeNull();
		});

		it("should be invalid on signup", () => {
			if (!component.state.signup)
				component.toggleSignup();

			const form = component.loginForm;
			const ctrlFirs = form.controls.firstname;
			const ctrlLast = form.controls.lastname;

			// We do not test these controls again
			form.controls.email.setValue("valid@mail.ch");
			form.controls.password.setValue("pa$$w0rd");

			ctrlFirs.setValue("");
			ctrlLast.setValue("");

			expect(form.valid).toBe(false);
			expect(ctrlFirs.errors?.required).toBeDefined();
			expect(ctrlLast.errors?.required).toBeDefined();

			ctrlFirs.setValue("a");

			expect(form.valid).toBe(false);
			expect(ctrlFirs.errors?.minlength).toBeDefined();
			expect(ctrlLast.errors?.required).toBeDefined();

			ctrlFirs.setValue("ab");
			ctrlLast.setValue("a");

			expect(form.valid).toBe(false);
			expect(ctrlFirs.errors).toBeNull();
			expect(ctrlLast.errors?.minlength).toBeDefined();
		});

		it("should be valid on signup", () => {
			if (!component.state.signup)
				component.toggleSignup();

			const form = component.loginForm;
			const ctrlFirs = form.controls.firstname;
			const ctrlLast = form.controls.lastname;

			form.controls.email.setValue("valid@mail.ch");
			form.controls.password.setValue("pa$$w0rd");

			ctrlFirs.setValue("Firstname");
			ctrlLast.setValue("Lastname");

			expect(form.valid).toBe(true);
			expect(ctrlFirs.errors).toBeNull();
			expect(ctrlLast.errors).toBeNull();
		});
	});

	describe("login", () => {
		beforeEach(() => cleanAuth());

		it("should not login", async () => {
			const selector = "form p mat-error";

			component.loginForm.controls.email.setValue("no-user@mail.co");
			component.loginForm.controls.password.setValue("pa$$w0rd");

			expect(component.user._connected).toBe(false);
			expect(compiled.querySelector(selector)).toBeNull();

			await component.formSubmit();
			fixture.detectChanges();

			expect(component.user._connected).toBe(false);
			expect(compiled.querySelector(selector)).toBeDefined();
			expect(compiled.querySelector(selector)?.textContent).toContain("L'identification a echoué.");

			expect(component.error).toBeDefined();
			expect((component.error as HttpErrorResponse).status).toBe(401);
		});

		it("should login (and redirect)", async () => {
			const router = TestBed.inject(Router);
			const selector = "form p mat-error";
			const originURL = router.url;

			const user = users[0];
			component.loginForm.controls.email.setValue(user.emailAddress);
			component.loginForm.controls.password.setValue(user.password);

			expect(component.user._connected).toBe(false);
			expect(compiled.querySelector(selector)).toBeNull();

			await component.formSubmit();
			fixture.detectChanges();

			expect(component.user._connected).toBe(true);
			expect(compiled.querySelector(selector)).toBeNull();

			await sleep(600);
			expect(router.url).not.toBe(originURL);
		});
	});

	describe("signup", () => {
		beforeEach(() => cleanAuth());

		it("should not signup", async () => {
			if (!component.state.signup)
				component.toggleSignup();

			component.loginForm.controls.email.setValue(users[0].emailAddress);
			component.loginForm.controls.password.setValue("pa$$w0rd");
			component.loginForm.controls.firstname.setValue("Firstname");
			component.loginForm.controls.lastname.setValue("Lastname");

			expect(component.user._connected).toBe(false);
			expect(compiled.querySelector(pMatError)).toBeNull();

			await component.formSubmit();
			fixture.detectChanges();

			expect(component.user._connected).toBe(false);
			expect(compiled.querySelector(pMatError)).toBeDefined();
			expect(compiled.querySelector(pMatError)?.textContent).toContain("utilisateur existe déjà");

			expect(component.error).toBeDefined();
			expect((component.error as HttpErrorResponse).status).toBe(409);
		});

		it("should signup (and redirect)", async () => {
			if (!component.state.signup)
				component.toggleSignup();

			const router = TestBed.inject(Router);
			const compiled = fixture.nativeElement as HTMLElement;
			const originURL = router.url;

			const email = "new-email@test.co";
			component.loginForm.controls.email.setValue(email);
			component.loginForm.controls.password.setValue("pa$$w0rd");
			component.loginForm.controls.firstname.setValue("Firstname");
			component.loginForm.controls.lastname.setValue("Lastname");

			expect(component.user._connected).toBe(false);
			expect(compiled.querySelector(pMatError)).toBeNull();

			await component.formSubmit();
			fixture.detectChanges();

			expect(component.user._connected).toBe(true);
			expect(component.user.emailAddress).toBe(email);
			expect(compiled.querySelector(pMatError)).toBeNull();

			await sleep(600);
			expect(router.url).not.toBe(originURL);
		});
	});

	it("should have another view when the user is already connected", async () => {
		await component.ngOnDestroy();

		const user = users[0];
		await TestBed.inject(AuthService).login(user.emailAddress, user.password);

		await component.ngOnInit();
		fixture.detectChanges();

		expect(component.user._connected).toBe(true);
		expect(compiled.querySelector("mat-card-actions button")?.textContent).toContain("Se déconnecter?");
	});
});
