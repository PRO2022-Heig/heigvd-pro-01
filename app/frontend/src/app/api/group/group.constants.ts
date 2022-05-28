import { ModelService } from "../_lib/model";

export const GROUPS_ENTRY_POINT = "/groups";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore Avoid circular dependency
export const groupDecodeEntityName = ModelService.prototype.decodeEntityName.bind({
	entryPoint: GROUPS_ENTRY_POINT
});
