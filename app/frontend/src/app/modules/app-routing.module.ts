import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MealComponent } from "../components/meals/meal/meal.component";
import { MealsComponent } from "../components/meals/meals.component";
import {RecipeComponent} from "../components/recipe/recipe.component";

const routes: Routes = [{
	component: MealsComponent,
	path: "meals"
}, {
	component: MealComponent,
	path: "meal/:id"
}, {
	component: RecipeComponent,
	path: "recipe/:id"
}];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
