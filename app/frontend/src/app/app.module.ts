import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { ApiModule } from "./api";
import { AppComponent } from "./components/app/app.component";
import { ComponentsModule } from "./components/components.module";
import { ServicesModule } from "./services";
import {ApiInterceptorTestProvider} from "../../test/helpers/api";

@NgModule({
	bootstrap: [AppComponent],
	imports: [
		ApiModule,
		BrowserModule,
		ComponentsModule,
		ServicesModule
	],
	providers: [
		ApiInterceptorTestProvider
	]
})
export class AppModule {
}
