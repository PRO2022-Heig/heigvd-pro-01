import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { IngredientService } from "../../api/ingredients";
import { Recipe, RecipeService } from "../../api/recipe";
import { Step, StepService } from "../../api/step";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"]
})
export class RecipeComponent implements OnInit {

	public recipe : Recipe | null = null;
	public recipeSteps : Step[] | null = null;
	public asdf:string | null= "";

	public constructor(private recipeService: RecipeService, private stepService: StepService,
					   private ingredientService: IngredientService, private route: ActivatedRoute,
					   private router: Router  ) {
		this.asdf = this.route.snapshot.paramMap.get("id");
	}

	public ngOnInit() {
		this.recipeService.get(1).then((recipe) => {
			this.recipe = recipe;
		});
		this.stepService.find().then((steps) => {
			steps.sort((a,b) => a.number - b.number);
			this.recipeSteps = steps;
		});
	}
}
