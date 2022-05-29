import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule} from "@angular/material/checkbox";
import { MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TagInputModule } from "ngx-chips";
import {MatChipsModule} from "@angular/material/chips";


export const materials = [
	BrowserAnimationsModule,
	MatAutocompleteModule,
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatExpansionModule,
	MatDividerModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatSidenavModule,
	MatToolbarModule,
	ReactiveFormsModule,
	MatSliderModule,
	TagInputModule
];

@NgModule({
	exports: materials,
	imports: materials
})
export class MaterialsModule {
}
