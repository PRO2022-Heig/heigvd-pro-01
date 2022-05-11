import { Model } from "../_lib/model";

import { Step } from "./step.interface";

export interface Recipe extends Model {
	// TODO: remove (use the ones from API)
	name: string;
	description: string;
	nbPeopleServed: number;
	steps: Step[];
}
