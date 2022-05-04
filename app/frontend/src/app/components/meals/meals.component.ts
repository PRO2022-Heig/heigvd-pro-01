import { Component, OnInit } from "@angular/core";
import {Observable, of} from "rxjs";

import {Meal, MealService} from "../../api/meal";
import {FoodConstraint} from "../../api/food-constraint";

@Component({
	selector: "app-meals",
	styleUrls: ["./meals.component.scss"],
	templateUrl: "./meals.component.html"
})
export class MealsComponent implements OnInit {
	public meals$!: Observable<Meal[]>;
	public foodConstraints$!: Observable<FoodConstraint[]>;
	public searchTerms: string;
	public minutes = 0;

	public constructor(private mealService: MealService) {
		this.searchTerms = "";
	}

	public ngOnInit(): void {
		// subscribe to observables here (use "extends BaseComponent") et appeler addSubscription()
		this.meals$ = of([
			{
				"id": 1,
				"name":"Spaghetti carbonara",
				"description": "Les pâtes à la carbonara ou sauce carbonara1 (pasta alla carbonara, en italien) sont une spécialité " +
					"culinaire traditionnelle de la cuisine italienne, originaire de Rome et du Latium, très populaire en " +
					"Italie et dans le monde, à base de pâtes cuisinées avec des œufs, des lardons et du fromage râpé."
			},

			{
				"id": 2,
				"name":"Pad thai",
				"description": "Le phat thai est un plat traditionnel thaïlandais à base de nouilles de riz, très apprécié et très " +
					"consommé dans toute la Thaïlande. Son nom signifie littéralement « sauté de style thaï ». "
			}

		] as Meal[]);

		this.foodConstraints$ = of([
			{
				"id": 1,
				"name": "Vegan",
				"description": "Vegan food does not use any product that has involved the exploitation of an animal."
			},
			{
				"id": 2,
				"name": "Vegetarian",
				"description": "Vegetarian food does not use any animal flesh (meat, fish and possibly more)."
			}
		] as FoodConstraint[]);
    }

	// if instant search is wanted -> https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
	public launchSearch(): void {
		this.mealService.get(0); // searchTerms
	}
}
