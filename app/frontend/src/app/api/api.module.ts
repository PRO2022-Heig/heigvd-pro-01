import { NgModule } from "@angular/core";

import { ApiClientModule } from "./api-client.module";
import { MealModule } from "./meal";

@NgModule({
	imports: [ApiClientModule, MealModule]
})
export class ApiModule {
}
