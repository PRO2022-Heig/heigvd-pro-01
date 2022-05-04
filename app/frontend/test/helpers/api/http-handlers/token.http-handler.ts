import { HttpErrorResponse, HttpRequest, HttpResponse, HttpResponseBase } from "@angular/common/http";

import { ModelId } from "../../../../src/app/api/_lib/model";

import { AuthService, TokenResponse } from "../../../../src/app/api/auth";
import { User } from "../../../../src/app/api/user";
import { users, UserTest } from "../../../mocks/api";
import { HttpHandlerTest, HttpHandlerTestParams, HTTP_METHOD } from "./http-handler.interface.test";

export class TokenHttpHandler implements HttpHandlerTest {
	private _id = 0;
	// Tokens
	private readonly tokens = new Map<string, ModelId>();
	// Refresh tokens
	private readonly rTokens = new Map<string, ModelId>();

	private readonly GET_SELF = "/app_users/mi";

	public canHandle(url: string): boolean {
		return url.startsWith(AuthService.ENTRY_POINT) || url.startsWith(this.GET_SELF);
	}

	public handle(params: HttpHandlerTestParams, request: HttpRequest<unknown>): HttpResponseBase {
		const {uri, fullUri} = params;

		if (uri === this.GET_SELF) {
			const user = this.getUser(request);
			if (user)
				return new HttpResponse({
					body: user,
					url: fullUri,
					status: 200
				});

			return new HttpErrorResponse({url: request.url, status: 401});
		}

		const action = uri.substring(AuthService.ENTRY_POINT.length);
		if (request.method === HTTP_METHOD.POST && action === "/get")
			return this.handleLogin(request);
		if (request.method === HTTP_METHOD.POST && action === "/refresh")
			return this.handleRefresh(request);

		return new HttpResponse({
			body: null,
			url: fullUri,
			status: 500
		});
	}

	/**
	 * Handle a login request
	 * @return the JWT tokens in a Response
	 */
	private handleLogin(request: HttpRequest<unknown>): HttpResponseBase {
		const body = request.body as Pick<UserTest, "emailAddress" | "password">;

		if (body && body.password && body.emailAddress) {
			const user = users.find(user =>
				user.emailAddress === body.emailAddress &&
				user.password === body.password
			);

			if (!user)
				return new HttpErrorResponse({url: request.url, status: 401});

			return new HttpResponse({
				body: this.generateJWTTokens(user.id),
				url: request.url,
				status: 200
			});
		}

		return new HttpErrorResponse({
			url: request.url,
			status: 400
		});
	}

	/**
	 * Handle a refresh request
	 */
	private handleRefresh(request: HttpRequest<unknown>): HttpResponseBase {
		const user = this.getUser(request);
		if (user)
			return new HttpResponse({
				body: this.generateJWTTokens(user.id),
				url: request.url,
				status: 200
			});

		return new HttpErrorResponse({
			url: request.url,
			status: 401
		});
	}

	/**
	 * Generate JWT token pair for a user.
	 */
	private generateJWTTokens(userId: ModelId): TokenResponse {
		const token = this.generateUniqueToken(userId);
		const refresh_token = this.generateUniqueToken(userId);

		this.tokens.set(token, userId);
		this.rTokens.set(refresh_token, userId);

		return {token, refresh_token};
	}

	/**
	 * Generate a unique string to simulate a token.
	 */
	private generateUniqueToken(userId: ModelId) {
		const id = ++this._id;
		return `${id}abc${userId}`;
	}

	/**
	 * Determine if the request with authorization is ok and return the connected user
	 * @return the user or false if it cannot determine a user of authorization header
	 */
	private getUser(request: HttpRequest<unknown>): User | false {
		// TODO: global to test permissions
		const header = request.headers.get("authorization");

		if (header) {
			const token = header.split(" ")[1];
			const userId = this.tokens.get(token);

			const user = users.find(user => user.id === userId);
			if (user) {
				const copy = JSON.parse(JSON.stringify(user)) as UserTest;
				copy.password = undefined as never;

				return copy;
			}
		}

		return false;
	}
}
