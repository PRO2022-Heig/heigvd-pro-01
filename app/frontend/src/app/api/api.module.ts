import { NgModule } from "@angular/core";

import { ApiClientModule } from "./api-client.module";
import { AuthModule } from "./auth";
import { MealModule } from "./meal";
import { UserModule } from "./user";

@NgModule({
	imports: [ApiClientModule, AuthModule, MealModule, UserModule]
})
export class ApiModule {
}
