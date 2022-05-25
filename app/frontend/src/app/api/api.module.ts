import { NgModule } from "@angular/core";

import { ApiClientModule } from "./api-client.module";
import { AuthModule } from "./auth";
import { EventModule } from "./event";
import { GroupModule } from "./group";
import { GroupUserMembershipsModule } from "./group_user_memberships";
import { IngredientModule } from "./ingredients";
import { MealModule } from "./meal";
import { RecipeModule } from "./recipe";
import { UserModule } from "./user";

@NgModule({
	imports: [
		ApiClientModule,
		AuthModule,
		EventModule,
		GroupModule,
		GroupUserMembershipsModule,
		IngredientModule,
		MealModule,
		RecipeModule,
		UserModule
	]
})
export class ApiModule {
}
