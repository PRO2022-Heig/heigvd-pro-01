import { NgModule } from "@angular/core";

import { ApiClientModule } from "./api-client.module";
import { AuthModule } from "./auth";
import { IngredientModule } from "./ingredients";
import { MealModule } from "./meal";
import { RecipeModule } from "./recipe";
import { UserModule } from "./user";

@NgModule({
	imports: [
		ApiClientModule,
		AuthModule,
		IngredientModule,
		MealModule,
		RecipeModule,
		UserModule
	]
})
export class ApiModule {
}
