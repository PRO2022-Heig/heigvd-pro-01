import { MealService } from "../../../src/app/api/meal";
import { Recipe, RecipeService } from "../../../src/app/api/recipe";
import { StepService } from "../../../src/app/api/step";

export const recipes: Recipe[] = [{
	"@id": `${RecipeService.ENTRY_POINT}/1`,
	id: 1,
	name: "Spaghetti carbonara",
	description: "La recette traditionnelle, avec pâtes à base de farine.",
	numberOfPeople: 2,
	createdAt: "2022-01-04T12:34.56Z",
	updatedAt: "2022-01-04T12:34.56Z",

	ingredients: [], // TODO
	meals: [`${MealService.ENTRY_POINT}/1`],
	__meals: [1],

	steps: [`${StepService.ENTRY_POINT}/1`, `${StepService.ENTRY_POINT}/2`],
	__steps: [1, 2]
}, {
	"@id": `${RecipeService.ENTRY_POINT}/2`,
	id: 2,
	name: "Spaghetti carbonara sans gluten",
	description: "Recette adaptée avec pâtes sans gluten.",
	numberOfPeople: 2,
	createdAt: "2022-01-04T12:34.56Z",
	updatedAt: "2022-01-04T12:34.56Z",

	ingredients: [], // TODO
	meals: [],
	__meals: [],

	steps: [],
	__steps: []
}, {
	"@id": `${RecipeService.ENTRY_POINT}/3`,
	id: 3,
	name: "Spaghetti carbonara vegan",
	description: "Recette adaptée avec substituts pour l'oeuf, le fromage et le lard.",
	numberOfPeople: 2,
	createdAt: "2022-01-04T12:34.56Z",
	updatedAt: "2022-01-04T12:34.56Z",

	ingredients: [], // TODO
	meals: [],
	__meals: [],

	steps: [],
	__steps: []
}];
