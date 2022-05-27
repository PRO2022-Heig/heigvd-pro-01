import { FoodConstraint, FoodConstraintService } from "../../../src/app/api/food-constraint";

export const foodConstraints: FoodConstraint[] = [{
	"@id": `${FoodConstraintService.ENTRY_POINT}/1`,
	id: 1,
	name: "Gluten",
	description: "Présent dans le blé, le seigle et l'orge et donc dans le pain, les pâtes etc.",
	createdAt: "2022-01-04T12:34.56Z",
	updatedAt: "2022-01-04T12:34.56Z"
},{
	"@id": `${FoodConstraintService.ENTRY_POINT}/2`,
	id: 2,
	name: "Lactose",
	description: "Présent dans les produits laitiers.",
	createdAt: "2022-01-04T12:34.56Z",
	updatedAt: "2022-01-04T12:34.56Z"
}];
