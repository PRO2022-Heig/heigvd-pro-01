import { ModelService } from "../_lib/model";

export const RECIPES_ENTRY_POINT = "/recipes";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Avoid circular dependency
export const recipeDecodeEntityName = ModelService.prototype.decodeEntityName.bind({
	entryPoint: RECIPES_ENTRY_POINT
});
