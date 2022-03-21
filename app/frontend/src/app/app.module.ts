import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { ApiModule } from "./api";
import { AppComponent } from "./components/app/app.component";
import { ComponentsModule } from "./components/components.module";

@NgModule({
	bootstrap: [AppComponent],
	imports: [
		ApiModule,
		BrowserModule,
		ComponentsModule
	]
})
export class AppModule {
}
