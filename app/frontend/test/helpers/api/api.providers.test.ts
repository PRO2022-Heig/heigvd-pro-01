import { Provider } from "@angular/core";

import { ApiInterceptorTestProvider } from "./api.interceptor.test";
import { CookieServiceTestProvider } from "./cookie.service.test";

// TODO: add more (cookie)?
export const ApiTestProviders: Provider[] = [
	ApiInterceptorTestProvider,
	CookieServiceTestProvider
];
