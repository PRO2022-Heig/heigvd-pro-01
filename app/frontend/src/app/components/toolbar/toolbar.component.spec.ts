import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MaterialsModule } from "../../modules";
import { ToolbarComponent } from "./toolbar.component";

describe("ToolbarComponent", () => {
	let component: ToolbarComponent;
	let fixture: ComponentFixture<ToolbarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ToolbarComponent],
			imports: [MaterialsModule]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ToolbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
