import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent, LoginComponentData } from "../components/login/login.component";
import { MealComponent } from "../components/meals/meal/meal.component";
import { MealsComponent } from "../components/meals/meals.component";
import { RecipeComponent } from "../components/recipe/recipe.component";
import { UserProfileComponent } from "../components/users/user-profile/user-profile.component";
import { AuthGuard } from "../guards";
import {NotFoundComponent} from "../components/not-found/not-found/not-found.component";

const routes: Routes = [{
	component: UserProfileComponent,
	path: "profile",
	canActivate: [AuthGuard]
}, {
	component: LoginComponent,
	path: "login"
}, {
	component: LoginComponent,
	path: "signup",
	data: {signup: true} as LoginComponentData
}, {
	component: MealsComponent,
	path: "meals"
}, {
	component: MealComponent,
	path: "meal/:id"
}, {
	component: RecipeComponent,
	path: "recipe/:id"
}, {
	component: NotFoundComponent,
	path: "**"
}];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
