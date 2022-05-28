import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent, LoginComponentData } from "../components/login/login.component";
import { MealsComponent } from "../components/meals/meals.component";
import { RecipeComponent } from "../components/recipe/recipe.component";
import { UserEventsComponent } from "../components/users/user-events/user-events.component";
import { UserGroupsComponent } from "../components/users/user-groups/user-groups.component";
import { UserProfileComponent } from "../components/users/user-profile/user-profile.component";
import { AuthGuard } from "../guards";

const routes: Routes = [{
	component: UserProfileComponent,
	path: "profile",
	canActivate: [AuthGuard]
}, {
	component: UserEventsComponent,
	path: "profile/events",
	canActivate: [AuthGuard]
}, {
	component: UserGroupsComponent,
	path: "profile/groups",
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
	component: RecipeComponent,
	path: "recipe/:id"
}];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
