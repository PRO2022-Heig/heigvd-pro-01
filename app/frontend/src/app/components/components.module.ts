import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule, FlexModule } from "@angular/flex-layout";

import { AppRoutingModule, MaterialsModule } from "../modules";
import { AppComponent } from "./app/app.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@NgModule({
	declarations: [AppComponent, HeaderComponent, SidebarComponent],
	imports: [AppRoutingModule, CommonModule, FlexLayoutModule, FlexModule, MaterialsModule]
})
export class ComponentsModule {
}
