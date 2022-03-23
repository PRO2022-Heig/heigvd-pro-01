import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule, FlexModule } from "@angular/flex-layout";

import { AppRoutingModule, MaterialsModule } from "../modules";
import { AppComponent } from "./app/app.component";
import { HeaderComponent } from "./header/header.component";
import { MealComponent } from "./meals/meal/meal.component";
import { MealsComponent } from "./meals/meals.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
	declarations: [AppComponent, HeaderComponent, MealComponent, MealsComponent, SidebarComponent],
	imports: [AppRoutingModule, CommonModule, FlexLayoutModule, FlexModule, MaterialsModule]
})
export class ComponentsModule {
}
