import { NgModule } from "@angular/core";

import { ApiClientModule } from "../api-client.module";
import { MealService } from "./meal.service";


@NgModule({
	imports: [ApiClientModule],
	providers: [MealService]
})
export class MealModule {
}
