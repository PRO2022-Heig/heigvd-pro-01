import { HomeMeal, HomeMealService } from "../../../../src/app/api/home-meal";
import { MealHttpHandler } from "./meal.http-handler";

export class HomeMealHttpHandler extends MealHttpHandler<HomeMeal> {
	protected override getEntryPoint(): string {
		return HomeMealService.ENTRY_POINT;
	}
}
