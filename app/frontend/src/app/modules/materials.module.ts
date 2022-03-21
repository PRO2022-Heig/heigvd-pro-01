import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

export const materials = [
	BrowserAnimationsModule,
	MatButtonModule,
	MatIconModule,
	MatSidenavModule,
	MatToolbarModule,
	ReactiveFormsModule
];

@NgModule({
	exports: materials,
	imports: materials
})
export class MaterialsModule {
}
