import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MaterialsModule } from "../../modules";
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HeaderComponent, ToolbarComponent],
			imports: [MaterialsModule]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
