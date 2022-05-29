import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { MaterialsModule } from "../../../modules";
import { MealComponent } from "./meal.component";

describe("MealComponent", () => {
	let component: MealComponent;
	let fixture: ComponentFixture<MealComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MealComponent],
			imports: [MaterialsModule, RouterTestingModule]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MealComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
