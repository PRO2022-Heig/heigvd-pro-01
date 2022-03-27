import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent, LoginComponentData } from "../components/login/login.component";
import { MealComponent } from "../components/meals/meal/meal.component";
import { MealsComponent } from "../components/meals/meals.component";

const routes: Routes = [{
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
}];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
