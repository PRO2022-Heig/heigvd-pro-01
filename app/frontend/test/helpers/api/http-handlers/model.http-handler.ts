import { HttpErrorResponse, HttpRequest, HttpResponse, HttpResponseBase } from "@angular/common/http";

import { Model } from "../../../../src/app/api/_lib/model";

import { HttpHandlerTest, HttpHandlerTestParams, HTTP_METHOD } from "./http-handler.interface.test";

export abstract class ModelHttpHandler<T extends Model> implements HttpHandlerTest {
	public constructor(protected readonly mocks: T[]) {
	}

	public canHandle(url: string): boolean {
		return url.startsWith(this.getEntryPoint());
	}

	public handle(params: HttpHandlerTestParams, request: HttpRequest<unknown>): HttpResponseBase {
		if (this.isAGetRequest(params, request))
			return this.handleGet(params, request);

		if (this.isACreateRequest(params, request))
			return this.handleCreate(params, request);

		if (this.isAUpdateRequest(params, request))
			return this.handleUpdate(params, request);

		// TODO: find + delete

		return new HttpErrorResponse({
			url: params.fullUri,
			status: 404
		});
	}

	/**
	 * Return the "action" of a generic model HTTP handler
	 */
	protected getAction(params: HttpHandlerTestParams) {
		return params.uri.substring(this.getEntryPoint().length);
	}

	/**
	 * Determine if the request is a "get" request
	 */
	protected isAGetRequest(params: HttpHandlerTestParams, request: HttpRequest<unknown>): boolean {
		// This is a bit redundant but keep the handler flexible
		return request.method === HTTP_METHOD.GET && !isNaN(+this.getAction(params).substring(1));
	}

	/**
	 * Determine if the request is a "create" request
	 */
	protected isACreateRequest(params: HttpHandlerTestParams, request: HttpRequest<unknown>): boolean {
		return request.method === HTTP_METHOD.POST && !this.getAction(params).length;
	}

	/**
	 * Determine if the request is a "update" request
	 */
	protected isAUpdateRequest(params: HttpHandlerTestParams, request: HttpRequest<unknown>): boolean {
		// This is a bit redundant but keep the handler flexible
		return request.method === HTTP_METHOD.PATCH && !isNaN(+this.getAction(params).substring(1));
	}

	/**
	 * Handle the "get" route
	 */ // eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected handleGet(params: HttpHandlerTestParams, request: HttpRequest<unknown>): HttpResponseBase {
		// request is keep for possible overrides
		const id = +this.getAction(params).substring(1);
		const data = this.mocks.find(_ => _.id === id);

		if (data)
			return new HttpResponse({
				body: data,
				url: params.fullUri,
				status: 404
			});

		return new HttpErrorResponse({
			url: params.fullUri,
			status: 404
		});
	}

	/**
	 * Handle the "create" route
	 */
	protected handleCreate(params: HttpHandlerTestParams, request: HttpRequest<unknown>): HttpResponseBase {
		const created = this.verifyCreate(request.body) as T;
		if (+created)
			return new HttpErrorResponse({
				url: params.fullUri,
				status: +created
			});

		created.id = this.mocks.reduce((a, b) => a > b.id ? a : b.id, 0) + 1;
		this.mocks.push(created);

		return new HttpResponse({
			body: created,
			url: params.fullUri,
			status: 201
		});
	}

	/**
	 * Handle the "update" route
	 */
	protected handleUpdate(params: HttpHandlerTestParams, request: HttpRequest<unknown>): HttpResponseBase {
		const id = +this.getAction(params).substring(1);
		const iData = this.mocks.findIndex(_ => _.id === id);
		const data = this.mocks[iData];

		if (data) {
			const updated = this.verifyUpdate(request.body, data);

			if (+updated)
				return new HttpErrorResponse({
					url: params.fullUri,
					status: +updated
				});

			// TODO: a merge function
			this.mocks[iData] = updated as T;
			return new HttpResponse({
				body: updated,
				url: params.fullUri,
				status: 201
			});
		}

		return new HttpErrorResponse({
			url: params.fullUri,
			status: 404
		});
	}

	/**
	 * Verify data
	 * @return the data to add to the "db" else the error status code
	 */
	protected abstract verifyCreate(data: unknown): T | number;
	/**
	 * Verify data
	 * @return the data to update to the "db" else the error status code
	 */
	protected abstract verifyUpdate(data: unknown, stored: T): T | number;

	protected abstract getEntryPoint(): string;
}
