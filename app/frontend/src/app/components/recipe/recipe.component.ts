import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ModelId } from "../../api/_lib/model";
import { BaseComponent } from "../_lib/_basics";

import { sleep } from "../../../helpers";
import { Recipe, RecipeService } from "../../api/recipe";
import { Step, StepService } from "../../api/step";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"]
})
export class RecipeComponent extends BaseComponent implements OnInit {
	public data?: {
		recipe: Recipe;
		steps: Step[];
	};

	public state: {
		error: false | HttpErrorResponse;
		loading: boolean;
	} = {
		error: false,
		loading: false
	};

	public constructor(
		private readonly service: RecipeService,
		private readonly stepService: StepService,
		private readonly route: ActivatedRoute) {
		super();
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.route.params.subscribe(params => this.load(+params.id))
		);
	}

	private load(id: ModelId) {
		this.state.error = false;
		this.state.loading = true;
		return this.service.get(id).then(async recipe => {
			const steps = await this.stepService.find({
				id: recipe.__steps
			})
				// Be sure of order
				.then(steps => steps.sort((a, b) => a.number - b.number));

			// Avoid an instant popup of data
			await sleep(150);
			this.data = {recipe, steps};
		})
			.catch(error => this.state.error = error)
			.finally(() => this.state.loading = false);
	}
}
