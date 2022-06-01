import { ModelService } from "../_lib/model";

export const RESTAURANT_ENTRY_POINT = "/restaurants";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Avoid circular dependency
export const restaurantDecodeEntityName = ModelService.prototype.decodeEntityName.bind({
	entryPoint: RESTAURANT_ENTRY_POINT
});
