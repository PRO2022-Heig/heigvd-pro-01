import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { FlexLayoutModule, FlexModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";

import { AuthService } from "../api/auth";
import { AuthInterceptor } from "../interceptors";
import { AppRoutingModule, MaterialsModule } from "../modules";
import { AppComponent } from "./app/app.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { MealsComponent } from "./meals/meals.component";
import { NotFoundComponent } from "./not-found/not-found/not-found.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { UserEventComponent } from "./users/user-events/user-event/user-event.component";
import { UserEventsComponent } from "./users/user-events/user-events.component";
import { UserGroupComponent } from "./users/user-groups/user-group/user-group.component";
import { UserGroupsComponent } from "./users/user-groups/user-groups.component";
import { UserProfileComponent } from "./users/user-profile/user-profile.component";

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		LoginComponent,
		MealsComponent,
		NotFoundComponent,
		RecipeComponent,
		SidebarComponent,
		ToolbarComponent,
		UserEventComponent,
		UserEventsComponent,
		UserGroupComponent,
		UserGroupsComponent,
		UserProfileComponent
	],
	imports: [
		AppRoutingModule,
		CommonModule,
		FlexLayoutModule,
		FlexModule,
		FormsModule,
		MaterialsModule
	],
	providers: [{
		deps: [AuthService],
		multi: true,
		provide: APP_INITIALIZER,
		useFactory: (authService: AuthService) => async () => {
			if (authService.hasAuthCookie())
				await authService._refresh()
					.then(() => authService.getConnected())
					.catch(() => undefined);
		}
	}, {
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true
	}]
})
export class ComponentsModule {
}
