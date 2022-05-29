import { Model } from "../_lib/model";

export interface Step extends Model {
	action: string;
	orderNumber: number;
}
