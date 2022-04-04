import { Component, OnInit } from "@angular/core";

import {Meal} from "../../../api/meal";
import {Step} from "../../../api/meal/step.interface";
import {Ingredient} from "../../../api/meal/ingredient.interface";

@Component({
	selector: "app-meal",
	styleUrls: ["./meal.component.scss"],
	templateUrl: "./meal.component.html"
})
export class MealComponent implements OnInit {

	public meal = {
		"id": 1,
		"name":"Spaghetti carbonara",
		"description": "Les pâtes à la carbonara ou sauce carbonara1 (pasta alla carbonara, en italien) sont une spécialité " +
			"culinaire traditionnelle de la cuisine italienne, originaire de Rome et du Latium, très populaire en " +
			"Italie et dans le monde, à base de pâtes cuisinées avec des œufs, des lardons et du fromage râpé.",
		"recipes": [
			{
				"id": 2,
				"name": "Spaghetti carbonara traditionnels",
				"description": "Ingrédients utilisés dans la recette classique.",
				"nbPeopleServed": 2
			},
			{
				"id": 3,
				"name": "Spaghetti carbonara sans gluten",
				"description": "Recette avec pâtes sans gluten.",
				"nbPeopleServed": 2
			}
		]
	} as Meal;

	public ngOnInit() {
		// TODO
	}
}
