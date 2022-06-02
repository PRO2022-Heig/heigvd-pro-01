import { NgModule } from "@angular/core";

import { ApiClientModule } from "./api-client.module";
import { AuthModule } from "./auth";
import { EventModule } from "./event";
import { FoodConstraintModule } from "./food-constraint";
import { GroupModule } from "./group";
import { GroupUserMembershipModule } from "./group_user_memberships";
import { HomeMealModule } from "./home-meal";
import { IngredientModule } from "./ingredients";
import { MealModule } from "./meal";
import { RecipeModule } from "./recipe";
import { RestaurantMealModule } from "./restaurant-meal";
import { UserModule } from "./user";

@NgModule({
	imports: [
		ApiClientModule,
		AuthModule,
		EventModule,
		GroupModule,
		GroupUserMembershipModule,
		FoodConstraintModule,
		IngredientModule,
		HomeMealModule,
		MealModule,
		RecipeModule,
		RestaurantMealModule,
		UserModule
	]
})
export class ApiModule {
}
