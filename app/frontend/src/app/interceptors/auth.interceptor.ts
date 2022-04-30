import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthService, AuthUser } from "../api/auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private readonly REFRESH_TIME = 60 * 60 * 1000; // refresh session after 1 hour on a request
	private user!: AuthUser;

	public constructor(private readonly service: AuthService, private readonly router: Router) {
		this.service.getUser().subscribe(user => this.user = user);
	}

	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(catchError((response: HttpErrorResponse, observer) => {
			// Redirect to the login page if the session expired
			if (response.status === 401 && this.user._connected) {
				this.service.disconnectUser();
				this.router.navigate(["/login"], {queryParams: {redirect: this.router.routerState.snapshot.url}}).then();
				return observer;
			}

			return throwError(() => response);
		}), source => {
			// Refresh JWT token each TIME
			if (this.user._connected && new Date().getTime() - this.user._checked_at.getTime() > this.REFRESH_TIME) {
				this.user._checked_at = new Date();
				this.service._refresh().then();
			}

			return source;
		});
	}
}
