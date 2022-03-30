import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


export const materials = [
	BrowserAnimationsModule,
	MatButtonModule,
	MatIconModule,
	MatSidenavModule,
	MatToolbarModule,
	MatFormFieldModule,
	MatInputModule,
	ReactiveFormsModule,
	MatCardModule
];

@NgModule({
	exports: materials,
	imports: materials
})
export class MaterialsModule {
}
