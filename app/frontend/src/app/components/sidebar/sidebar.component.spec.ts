import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ApiModule } from "../../api";
import { MaterialsModule } from "../../modules";
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { SidebarComponent } from "./sidebar.component";

describe("SidebarComponent", () => {
	let component: SidebarComponent;
	let fixture: ComponentFixture<SidebarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SidebarComponent, ToolbarComponent],
			imports: [ApiModule, MaterialsModule]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SidebarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
