import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { FlexLayoutModule, FlexModule } from "@angular/flex-layout";

import { AuthService } from "../api/auth";
import { AuthInterceptor } from "../interceptors";
import { AppRoutingModule, MaterialsModule } from "../modules";
import { AppComponent } from "./app/app.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { MealComponent } from "./meals/meal/meal.component";
import { MealsComponent } from "./meals/meals.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { UserProfileComponent } from "./users/user-profile/user-profile.component";

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		LoginComponent,
		MealComponent,
		MealsComponent,
		SidebarComponent,
		UserProfileComponent
	],
	imports: [AppRoutingModule, CommonModule, FlexLayoutModule, FlexModule, MaterialsModule],
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
