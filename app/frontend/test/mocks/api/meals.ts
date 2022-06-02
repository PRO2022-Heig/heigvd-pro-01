import { MealService, MealWithType } from "../../../src/app/api/meal";

export const meals: MealWithType[] = [{
	"@id": `${MealService.ENTRY_POINT}/2`,
	id: 1,
	name: "Spaghetti carbonara",
	description: "Les pâtes à la carbonara ou sauce carbonara1 (pasta alla carbonara, en italien) sont une spécialité "
		+ "culinaire traditionnelle de la cuisine italienne, originaire de Rome et du Latium, très populaire en "
		+ "Italie et dans le monde, à base de pâtes cuisinées avec des œufs, des lardons et du fromage râpé.",
	home_type: "home_meal",
	createdAt: "2022-01-04T12:34.56Z",
	updatedAt: "2022-01-04T12:34.56Z",

	"@type": "HomeMeal"
}, {
	"@id": `${MealService.ENTRY_POINT}/2`,
	id: 2,
	name: "Pad thai",
	description: "Le phat thai est un plat traditionnel thaïlandais à base de nouilles de riz, très apprécié et très "
		+ "consommé dans toute la Thaïlande. Son nom signifie littéralement « sauté de style thaï ». ",
	home_type: "home_meal",
	createdAt: "2022-01-04T12:34.56Z",
	updatedAt: "2022-01-04T12:34.56Z",

	"@type": "HomeMeal"
}];
