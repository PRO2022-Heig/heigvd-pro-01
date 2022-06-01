import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ApiTestProviders } from "../../../../test/helpers/api";
import { ApiClientModule } from "../../api";
import { MaterialsModule } from "../../modules";
import { RecipeComponent } from "./recipe.component";

describe("RecipeComponent", () => {
	let component: RecipeComponent;
	let fixture: ComponentFixture<RecipeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RecipeComponent],
			imports: [ApiClientModule, MaterialsModule, RouterTestingModule],
			providers: ApiTestProviders
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RecipeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
