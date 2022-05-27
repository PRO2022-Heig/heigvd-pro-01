import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Provider } from "@angular/core";
import { Observable, of, throwError } from "rxjs";

import { apiUrl } from "../../../src/app/api";
import {foodConstraints, meals, users} from "../../mocks/api";
import {FoodConstraintHttpHandler, MealHttpHandler, TokenHttpHandler, UserHttpHandler} from "./http-handlers";
import { HttpHandlerTest } from "./http-handlers/http-handler.interface.test";

export class ApiInterceptorTest implements HttpInterceptor {
	private readonly handlers: HttpHandlerTest[] = [
		new TokenHttpHandler(),
		new UserHttpHandler(users),
		new MealHttpHandler(meals),
		new FoodConstraintHttpHandler(foodConstraints)
	];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		// TODO: add a random sleep? (simulates a response time)

		const fullUri = request.url.replace(apiUrl, "");

		const handler = this.handlers.find(handler => handler.canHandle(fullUri));
		if (handler) {
			let uri = fullUri;
			//let queryParams = ""; // TODO: convert to object

			{
				const paramPos = uri.indexOf("?");
				if (paramPos !== -1)
					//queryParams = uri.substring(paramPos + 1);
					uri = uri.substring(0, paramPos);
			}

			const response = handler.handle({uri, fullUri}, request);
			return response.status >= 400
				? throwError(() => response)
				: of(response as HttpResponse<unknown>);
		}

		return throwError(() => new HttpResponse({
			body: null,
			url: fullUri,
			status: 404
		}));
	}
}

export const ApiInterceptorTestProvider: Provider = {
	multi: true,
	provide: HTTP_INTERCEPTORS,
	useClass: ApiInterceptorTest
};
