import { HttpClient, HttpClientModule, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { CookieService } from "../services/cookie";

export interface IRequestOptions {
	headers?: HttpHeaders | {
		[header: string]: string | string[];
	};
	observe?: "body" | "events";

	/**
	 * Function called with an observer on events (setting this, change observe to 'events')
	 * @param event
	 */
	observeEvent?: <T>(event: HttpEvent<T>, index?: number) => void;
	params?: HttpParams | {
		[param: string]: string | string[];
	};
	reportProgress?: boolean;
	responseType?: "json";
}

interface RequestOptions extends IRequestOptions {
	/**
	 * Put the bearer token if present
	 * @default true
	 */
	auth?: boolean;
	body?: unknown;
}

export const apiUrl = environment.server;

@NgModule({
	exports: [HttpClientModule],
	imports: [HttpClientModule]
})
export class ApiClientModule {

	public static getFullUrl(endpoint: string) {
		// TODO: check for '/'
		return apiUrl + endpoint;
	}

	// Extending the HttpClient through the Angular DI.
	public constructor(
		protected readonly http: HttpClient,
		private readonly cookieService: CookieService) {
	}

	/**
	 * GET request
	 * @param endPoint it doesn't need / in front of the end point
	 * @param options options of the request like headers, body, etc.
	 */
	public get<T>(endPoint: string, options?: IRequestOptions): Promise<T> {
		return this.request<T>("GET", endPoint, options);
	}

	/**
	 * POST request
	 * @param endPoint end point of the api
	 * @param body of the request.
	 * @param options options of the request like headers, body, etc.
	 */
	public post<T>(endPoint: string, body?: unknown, options: IRequestOptions = {}): Promise<T> {
		(options as RequestOptions).body = body;
		return this.request<T>("POST", endPoint, options);
	}

	/**
	 * PATCH request
	 * @param endPoint end point of the api
	 * @param body body of the request.
	 * @param options options of the request like headers, body, etc.
	 */
	public patch<T>(endPoint: string, body?: unknown, options: IRequestOptions = {}): Promise<T> {
		(options as RequestOptions).body = body;
		return this.request<T>("PATCH", endPoint, options);
	}

	/**
	 * PUT request
	 * @param endPoint end point of the api
	 * @param body body of the request.
	 * @param options options of the request like headers, body, etc.
	 */
	public put<T>(endPoint: string, body?: unknown, options: IRequestOptions = {}): Promise<T> {
		(options as RequestOptions).body = body;
		return this.request<T>("PUT", endPoint, options);
	}

	/**
	 * DELETE request
	 * @param endPoint end point of the api
	 * @param options options of the request like headers, body, etc.
	 */
	public delete<T>(endPoint: string, options?: RequestOptions): Promise<T> {
		return this.request<T>("DELETE", endPoint, options);
	}

	private request<T>(method: string, endPoint: string, option: RequestOptions = {}): Promise<T> {
		if (option.auth ?? true) {
			// Add the authorization header
			const cookie = this.cookieService.get();
			if (cookie.auth?.token) {
				const header = "Authorization";
				const bearer = `Bearer ${cookie.auth.token}`;

				if (option.headers instanceof HttpHeaders)
					option.headers.set(header, bearer);
				else {
					if (!option.headers)
						option.headers = {};

					option.headers[header] = bearer;
				}
			}
		}

		const onEvents = option.observeEvent || option.observe === "events";
		if (onEvents) {
			option.observe = "events";
			option.reportProgress = true;
		}

		let request = this.http.request(method, ApiClientModule.getFullUrl(endPoint), option);
		if (option.observeEvent)
			request = request.pipe(map((event, index) => {
				(option as Required<IRequestOptions>).observeEvent(event, index);
				return event;
			}));

		return lastValueFrom(request).then(_ => onEvents ? (_  as HttpResponse<T>).body : _);
	}
}
