import { Options } from "@angular-slider/ngx-slider";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter, switchMap } from "rxjs";

import { ModelFoundAndPagination } from "../../api/_lib/model/model.types";
import { BaseComponent } from "../_lib/_basics";

import { FoodConstraint, FoodConstraintService } from "../../api/food-constraint";
import { HomeMealSearch, HomeMealService } from "../../api/home-meal";
import { Meal, MealType } from "../../api/meal";
import { Recipe, RecipeSearch, RecipeService } from "../../api/recipe";
import { Restaurant, RestaurantService } from "../../api/restaurant";
import { RestaurantMeal, RestaurantMealService } from "../../api/restaurant-meal";

interface SearchForm extends FormGroup {
	controls: {
		inConstraints: FormControl;
		outConstraints: FormControl;
		name: FormControl;
		mealType: FormControl;
		timeMin: FormControl;
		timeMax: FormControl;
	};

	value: {
		inConstraints: FoodConstraint[];
		outConstraints: FoodConstraint[];
		mealType: MealType,
		name: string;
		timeMin: number;
		timeMax: number;
	};
}

interface MealHelped extends Meal {
	recipeState?: {
		error: false | HttpErrorResponse;
		restaurant: Restaurant;
		loading: boolean;
		recipes: Recipe[];
	}
}

@Component({
	selector: "app-meals",
	styleUrls: ["./meals.component.scss"],
	templateUrl: "./meals.component.html"
})
export class MealsComponent extends BaseComponent implements OnInit {
	public readonly SLIDER_OPTIONS: Options;

	public readonly TIME_MIN = 0;
	public readonly TIME_MAX = 245;

	public readonly state: {
		error: false | HttpErrorResponse;
		loading: boolean;
	} = {
		error: false,
		loading: false
	};

	// search results
	public meals?: ModelFoundAndPagination<MealHelped>;

	public readonly inConstraintSearch = new FormControl();
	public readonly outConstraintSearch = new FormControl();
	public foodInConstraints: FoodConstraint[] = [];
	public foodOutConstraints: FoodConstraint[] = [];
	public readonly searchForm: SearchForm;

	private page = 1;

	public constructor(
		private readonly homeMealService: HomeMealService,
		private readonly restaurantMealService: RestaurantMealService,
		private readonly foodConstraintsService: FoodConstraintService,
		private readonly recipeService: RecipeService,
		private readonly restaurantService: RestaurantService) {
		super();

		this.SLIDER_OPTIONS = {
			floor: this.TIME_MIN,
			ceil: this.TIME_MAX,
			step: 5,
			translate: value => {
				if (value === this.TIME_MAX)
					return "&infin;";

				return `${value} min`;
			}
		};

		const timeValidators = [Validators.min(this.TIME_MIN), Validators.max(this.TIME_MAX)];

		this.searchForm = new FormGroup({
			inConstraints: new FormControl([]),
			outConstraints: new FormControl([]),
			mealType: new FormControl("home_meal" as MealType, [Validators.required]),
			name: new FormControl(""),
			timeMin: new FormControl(this.TIME_MIN, timeValidators),
			timeMax: new FormControl(this.TIME_MAX, timeValidators)
		} as SearchForm["controls"]) as SearchForm;
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.inConstraintSearch.valueChanges.pipe(
				debounceTime(250),
				// Do not search with empty string
				filter((_: string) => !!_),
				distinctUntilChanged(),
				switchMap(name => {
					const ids = this.foodInConstraints.map(_ => _.id);
					return this.foodConstraintsService.find({name})
						// Do not display if a constraint is already set
						.then(constraints => constraints.filter(_ => !ids.includes(_.id)))
						.catch(() => []);
				})
			).subscribe(_ => this.foodInConstraints = _),

			this.outConstraintSearch.valueChanges.pipe(
				debounceTime(250),
				// Do not search with empty string
				filter((_: string) => !!_),
				distinctUntilChanged(),
				switchMap(name => {
					const ids = this.foodOutConstraints.map(_ => _.id);
					return this.foodConstraintsService.find({name})
						// Do not display if a constraint is already set
						.then(constraints => constraints.filter(_ => !ids.includes(_.id)))
						.catch(() => []);
				})
			).subscribe(_ => this.foodOutConstraints = _)
		);
	}

	public addInConstraint(constraint: FoodConstraint) {
		const constraints = this.searchForm.value.inConstraints;
		if (!constraints.find(_ => _.id === constraint.id))
			constraints.push(constraint);

		this.inConstraintSearch.setValue("");
	}

	public removeInConstraint(constraint: FoodConstraint) {
		const constraints = this.searchForm.value.inConstraints;
		const index = constraints.findIndex(_ => _.id === constraint.id);
		if (index >= 0)
			constraints.splice(index, 1);
	}

	public addOutConstraint(constraint: FoodConstraint) {
		const constraints = this.searchForm.value.outConstraints;
		if (!constraints.find(_ => _.id === constraint.id))
			constraints.push(constraint);

		this.outConstraintSearch.setValue("");
	}

	public removeOutConstraint(constraint: FoodConstraint) {
		const constraints = this.searchForm.value.outConstraints;
		const index = constraints.findIndex(_ => _.id === constraint.id);
		if (index >= 0)
			constraints.splice(index, 1);
	}

	public runSearch() {
		this.page = 1;
		return this.loadMeals()
			.then(_ => this.meals = _).catch(() => undefined);
	}

	public nextPage() {
		++this.page;

		return this.loadMeals().then(res => {
			this.meals?.data.push(...res.data);
		}).catch(() => undefined);
	}

	public async loadRecipes(meal: MealHelped) {
		const recipeState: MealHelped["recipeState"] = {
			error: false,
			loading: true,
			recipes: [],
			// not the best, but ...
			restaurant: undefined as never
		};
		meal.recipeState = recipeState;

		if (meal.home_type === "restaurant_meal") {
			recipeState.restaurant = await this.restaurantService.get((meal as RestaurantMeal).__restaurant)
				.catch(error => {
					recipeState.error = error;
					return undefined as never;
				})
				.finally(() => recipeState.loading = false);
			return;
		}

		const search: RecipeSearch = {
			duration: {},
			"ingredients.ingredient.foodConstraints.id": this.searchForm.value.inConstraints.map(_ => _.id),
			"meals.id": meal.id,
			"not_in_ingredients.ingredient.foodConstraints.id": this.searchForm.value.outConstraints.map(_ => _.id)
		};

		if (this.searchForm.value.timeMin)
			search.duration!.gte = this.searchForm.value.timeMin;
		if (this.searchForm.value.timeMax < this.TIME_MAX)
			search.duration!.lte = this.searchForm.value.timeMax;

		return this.recipeService.find(search)
			.then(recipes => recipeState.recipes = recipes)
			.catch(error => recipeState.error = error)
			.finally(() => recipeState.loading = false);
	}

	private loadMeals(): Promise<ModelFoundAndPagination<Meal>> {
		const inConstraintIds = this.searchForm.value.inConstraints.map(_ => _.id);
		const outConstraintIds = this.searchForm.value.outConstraints.map(_ => _.id);
		const name = this.searchForm.value.name;

		let action: Promise<ModelFoundAndPagination<Meal>>;
		if (this.searchForm.value.mealType === "restaurant_meal")
			action = this.restaurantMealService.findAndPagination({
				name,
				"foodConstraint.id": inConstraintIds,
				"not_in_foodConstraint.id": outConstraintIds
			}, {page: this.page});
		else {
			const search: HomeMealSearch = {
				name,
				"recipes.duration": {},
				"recipes.ingredients.ingredient.foodConstraints.id": inConstraintIds,
				"not_in_recipes.ingredients.ingredient.foodConstraints.id": outConstraintIds
			};

			if (this.searchForm.value.timeMin)
				search["recipes.duration"]!.gte = this.searchForm.value.timeMin;
			if (this.searchForm.value.timeMax < this.TIME_MAX)
				search["recipes.duration"]!.lte = this.searchForm.value.timeMax;

			action = this.homeMealService.findAndPagination(search, {page: this.page});
		}

		this.state.error = false;
		this.state.loading = true;
		return action
			.catch(error => {
				throw this.state.error = error;
			})
			.finally(() => this.state.loading = false);
	}
}
