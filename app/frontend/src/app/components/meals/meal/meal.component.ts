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
				"name": "Spaghetti carbonara traditionnels",
				"description": "Ingrédients utilisés dans la recette classique.",
				"nbPeopleServed": 2,
				"steps": [
					{
						"action": "Mettre l'eau dans une casserole, ajouter le sel, faire bouillir et y ajouter les pâtes.",
						"orderNumber": 1,
						"ingredients": [
							{
								"name": "spaghettis",
								"description": "???",
								"quantity": 200,
								"unit": "g"
							},
							{
								"name": "sel",
								"description": "???",
								"quantity": 1,
								"unit": "cc"
							},
							{
								"name": "eau",
								"description": "???",
								"quantity": 1,
								"unit": "litre"
							}
						]
					}
				]
			}
		]
	} as Meal;

	public ngOnInit() {
	}
}
