import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { ApiTestProviders } from "../../../../test/helpers/api";
import { ApiModule } from "../../api";
import { MaterialsModule } from "../../modules";
import { MealsComponent } from "./meals.component";

describe("MealsComponent", () => {
	let component: MealsComponent;
	let fixture: ComponentFixture<MealsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MealsComponent],
			imports: [ApiModule, FormsModule, MaterialsModule, RouterTestingModule],
			providers: ApiTestProviders
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MealsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
