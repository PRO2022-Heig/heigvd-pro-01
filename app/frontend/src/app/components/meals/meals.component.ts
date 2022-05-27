import { Component, OnInit } from "@angular/core";
import {BehaviorSubject, from, Observable, of, startWith, switchMap} from "rxjs";

import {Meal, MealService} from "../../api/meal";
import {FoodConstraint, FoodConstraintService} from "../../api/food-constraint";
import {FormControl} from "@angular/forms";
import {map} from "rxjs/operators";

@Component({
	selector: "app-meals",
	styleUrls: ["./meals.component.scss"],
	templateUrl: "./meals.component.html"
})
export class MealsComponent implements OnInit {
	public foundMeals: Meal[] = [];
	public serverFoodConstraints: FoodConstraint[] = [];
	public foodConstraintSearch = new FormControl();
	public filteredFoodConstraints: BehaviorSubject<FoodConstraint[]> = new BehaviorSubject<FoodConstraint[]>([]);
	public addedFoodConstraints: FoodConstraint[] = [];
	public searchTerms: string;
	public minutes = 0;

	public constructor(private mealService: MealService, private foodConstraintsService: FoodConstraintService) {
		this.searchTerms = "";
	}

	public ngOnInit(): void {
		this.foodConstraintSearch.valueChanges.pipe(
			startWith(""),
			switchMap(value => {
				return this.foodConstraintsService.find({name: value}, {});
			})
		).subscribe(x => this.filteredFoodConstraints.next(x));
    }

	public displayWith(foodConstraint: FoodConstraint) : string {
		return foodConstraint.name;
	}

	// if instant search is wanted -> https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
	public launchSearch(): void {

		// TODO Launch a search using what was retrieved from GUI
		// this.searchTerms // mots-clefs libres de l'utilisateur
		// this.chosenFoodConstraints
		// this.minutes // prep. time en minutes

		// TODO To finalize with Hugo
		this.mealService.find({name: this.searchTerms}, {}).then(meals => {
			this.foundMeals = meals;
		});
	}
	public chosenFoodConstraints:FoodConstraint[] = [];
}
