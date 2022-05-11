import { HttpRequest, HttpResponseBase } from "@angular/common/http";

export const enum HTTP_METHOD {
	// TODO: put elsewhere? Can be useful anywhere
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	PATCH = "PATCH",
	DELETE = "DELETE"
}

export interface HttpHandlerTestParams {
	uri: string;
	fullUri: string;
	// TODO: params
}

export interface HttpHandlerTest {
	/**
	 * @return Can this handler handle the uri?
	 */
	canHandle(uri: string): boolean;

	/**
	 * Make this handler handle a request
	 */
	handle(params: HttpHandlerTestParams, request: HttpRequest<unknown>): HttpResponseBase;
}
