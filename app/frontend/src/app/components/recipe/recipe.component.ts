import { Component, OnInit } from "@angular/core";
import {Recipe} from "../../api/recipe";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"]
})
export class RecipeComponent implements OnInit {

	/*private recipe$ = of({
		"id": 2,
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
	}) as Observable<Recipe>;*/

	public recipe : Recipe | null = null;

	public ngOnInit() {
	  /*this.recipe$.subscribe((_recipe) => {
		  _recipe.steps.sort((a,b) => a.orderNumber - b.orderNumber);
		  this.recipe = _recipe;
	  });*/
	}
}
