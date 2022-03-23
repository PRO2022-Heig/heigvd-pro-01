import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MealComponent } from "../components/meals/meal/meal.component";
import { MealsComponent } from "../components/meals/meals.component";

const routes: Routes = [{
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
