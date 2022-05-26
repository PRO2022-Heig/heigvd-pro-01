import { Injectable } from "@angular/core";

import { ModelService } from "../_lib/model";

import { Group } from "./group.interface";

@Injectable({
	providedIn: "root"
})
export class GroupService extends ModelService<Group> {
	public static readonly ENTRY_POINT = "/groups";

	public readonly entryPoint = GroupService.ENTRY_POINT;

	protected override _decode() {
		// Do nothing
	}
}
