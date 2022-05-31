import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MaterialsModule } from "../../modules";
import { RecipeComponent } from "./recipe.component";

describe("RecipeComponent", () => {
	let component: RecipeComponent;
	let fixture: ComponentFixture<RecipeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RecipeComponent],
			imports: [MaterialsModule]
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
