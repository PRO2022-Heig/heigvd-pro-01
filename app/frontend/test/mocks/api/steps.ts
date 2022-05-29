import { Step, StepService } from "../../../src/app/api/step";

export const steps: Step[] = [
	{
		"@id": `${StepService.ENTRY_POINT}/1`,
		id: 1,
		orderNumber: 1,
		action: "Text of the first step",
		createdAt: "2022-01-04T12:34.56Z",
		updatedAt: "2022-01-04T12:34.56Z"
	},
	{
		"@id": `${StepService.ENTRY_POINT}/2`,
		id: 2,
		orderNumber: 2,
		action: "Text of the second step",
		createdAt: "2022-01-04T12:34.56Z",
		updatedAt: "2022-01-04T12:34.56Z"
	}
];
