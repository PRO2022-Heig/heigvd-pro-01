import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormControl} from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter, switchMap} from "rxjs";

import {FoodConstraint, FoodConstraintService} from "../../api/food-constraint";
import {Meal, MealService} from "../../api/meal";
import {Recipe, RecipeService} from "../../api/recipe";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {map} from "rxjs/operators";

@Component({
	selector: "app-meals",
	styleUrls: ["./meals.component.scss"],
	templateUrl: "./meals.component.html"
})
export class MealsComponent {

	// keyword search
	public searchTerms: string;

	// food constraints
	@ViewChild("foodConstraintInput")
	public foodConstraintInput: ElementRef<HTMLInputElement> | undefined;
	@ViewChild("auto")
	public foodConstraintAutocomplete: MatAutocomplete | undefined;
	public separatorKeysCodes: number[] = [ENTER, COMMA];
	public foodConstraintsControl = new FormControl();
	public suggestedFoodConstraints: FoodConstraint[] = [];
	public selectedFoodConstraints: FoodConstraint[] = [];

	// preparation time
	public minutes = 0;

	// search results
	public foundMeals: Meal[] = [];
	public recipesForMeal: {[mealId: number]: Recipe[]} = {};

	public constructor(private mealService: MealService, private foodConstraintsService: FoodConstraintService,
					   private recipesService: RecipeService) {
		this.searchTerms = "";

		this.foodConstraintsControl.valueChanges.pipe(
			debounceTime(250),
			filter(v => !!v),
			distinctUntilChanged(),
			switchMap(v => this.foodConstraintsService.find({name: v})),
			map(fcArray => fcArray.filter(fc => this.selectedFoodConstraints.every(sfc => sfc.id !== fc.id)))
		).subscribe(
			results => {
				this.suggestedFoodConstraints = results;
			}
		);
	}

	public textualChipInput(event: MatChipInputEvent): void {
		const matchIndex = this.suggestedFoodConstraints.findIndex(sfc => sfc.name === event.value);

		if (matchIndex !== -1) {
			this.selectedFoodConstraints.push( this.suggestedFoodConstraints[matchIndex] );
			this.suggestedFoodConstraints.splice(matchIndex, 1);
		}
		event.chipInput?.clear();
		this.foodConstraintsControl.setValue(null);
	}

	public autocompleteOptionSelected(a:MatAutocompleteSelectedEvent) {
		const matchIndex = this.suggestedFoodConstraints.findIndex(sfc => sfc === a.option.value);
		this.selectedFoodConstraints.push(a.option.value);
		this.suggestedFoodConstraints.splice(matchIndex, 1);
		if (this.foodConstraintInput)
			this.foodConstraintInput.nativeElement.value = "";
		this.foodConstraintsControl.setValue(null);
	}
	public unselectFoodConstraint(a:FoodConstraint) {
		const index = this.selectedFoodConstraints.indexOf(a);

		if (index >= 0)
			this.selectedFoodConstraints.splice(index, 1);
	}

	public loadMealRecipes(mealId: number) {
		// TODO Check recipe search parameters
		this.recipesService.find({}).then((foundRecipes: Recipe[]) => {
			this.recipesForMeal[mealId] = foundRecipes;
		});
	}

	// if instant search is wanted -> https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
	public launchSearch(): void {

		// TODO Launch a search using what was retrieved from GUI
		// this.searchTerms // mots-clefs libres de l'utilisateur
		// this.chosenFoodConstraints
		// this.minutes // prep. time en minutes

		// TODO Do 2 requests (one with home, oen with restaurant)
		// TODO To finalize with Hugo and Simon
		this.mealService.find({name: this.searchTerms}, {}).then(meals => {
			this.foundMeals = meals;
		});
	}
	public chosenFoodConstraints:FoodConstraint[] = [];
}
