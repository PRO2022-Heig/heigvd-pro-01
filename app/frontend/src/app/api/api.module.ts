import { NgModule } from "@angular/core";

import { ApiClientModule } from "./api-client.module";
import { MealModule } from "./meal";
import { UserModule } from "./user";

@NgModule({
	imports: [ApiClientModule, MealModule, UserModule]
})
export class ApiModule {
}
