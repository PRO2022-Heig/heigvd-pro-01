import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule, FlexModule } from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";

import { AppRoutingModule, MaterialsModule } from "../modules";
import { AppComponent } from "./app/app.component";
import { HeaderComponent } from "./header/header.component";
import { MealComponent } from "./meals/meal/meal.component";
import { MealsComponent } from "./meals/meals.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
	declarations: [AppComponent, HeaderComponent, MealComponent, MealsComponent, SidebarComponent, RecipeComponent],
    imports: [AppRoutingModule, CommonModule, FlexLayoutModule, FlexModule, MaterialsModule, FormsModule, MatExpansionModule]
})
export class ComponentsModule {
}
