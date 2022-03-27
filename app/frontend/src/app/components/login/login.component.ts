import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { BaseComponent } from "../_lib/_basics";

import { AuthUser, UserService } from "../../api/user";

interface OAuth {
	img: {
		alt?: string;
		src: string;
	};
	name: string;
	onclick: () => void
}

interface LoginFormGroup extends FormGroup {
	controls: {
		email: FormControl;
		password: FormControl;
	};

	value: {
		[K in keyof LoginFormGroup["controls"]]: LoginFormGroup["controls"][K]["value"];
	};
}

export interface LoginComponentData {
	signup?: boolean;
}

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent extends BaseComponent implements OnInit {
	// TODO: use "https://www.npmjs.com/package/angularx-social-login"?

	public tmp = UserService.tmpLogin; // TODO: remove

	public oAuths: OAuth[] = [];
	public error: HttpErrorResponse | false = false;
	public loading = false;
	public loginForm!: LoginFormGroup;
	public readonly state = {
		loginOk: false,
		redirection: false,
		signup: false
	};
	public user!: AuthUser;

	private readonly DEFAULT_REDIRECT = "/";
	private redirectUrl?: string;

	public constructor(
		private readonly service: UserService,
		private readonly location: Location,
		private readonly route: ActivatedRoute,
		private readonly router: Router
	) {
		super();

		this.oAuths.push({
			img: {
				alt: "google-icon",
				src: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
			},
			name: "Google",
			onclick: () => {
				// TODO
			}
		});
	}

	public ngOnInit() {
		this.loginForm = new FormGroup({
			email: new FormControl("", [Validators.required/*, Validators.email*/]),
			password: new FormControl("", [Validators.required])
		} as LoginFormGroup["controls"]) as LoginFormGroup;

		this.addSubscriptions(
			this.route.data.subscribe((data: LoginComponentData) => this.state.signup = !!data.signup),
			this.route.queryParams.subscribe(params => this.redirectUrl = params["redirect"]),
			this.service.getUser().subscribe(user => {
				this.user = user;
				this.loginForm.controls.email.setValue(user.email);

				if (user._connected) {
					if (this.state.signup)
						this.toggleSignup();
					if (this.redirectUrl)
						this.redirect();
				}
			})
		);
	}

	public login() {
		if (!this.loginForm.valid)
			return;

		this.error = false;
		this.loading = true;

		const {email, password} = this.loginForm.value;
		this.service.login(email, password)
			.then(user => {
				if (user._connected) {
					this.state.loginOk = true;
					this.redirect();
				}
			})
			.catch(error => this.error = error)
			.finally(() => this.loading = false);
	}

	public logout() {
		return this.service.logout().then(() => {
			this.state.redirection = true;

			return new Promise<void>(resolve =>
				setTimeout(() => {
					// TODO: "sleep" method?
					this.state.redirection = false;
					resolve();
				}, 500)
			);
		});
	}

	public toggleSignup() {
		this.state.signup = !this.state.signup;
		this.location.go(this.state.signup ? "/signup" : "/login", location.search);
	}

	private redirect() {
		this.state.redirection = true;
		setTimeout(() => this.router.navigateByUrl(this.redirectUrl || this.DEFAULT_REDIRECT), 750);
	}
}
