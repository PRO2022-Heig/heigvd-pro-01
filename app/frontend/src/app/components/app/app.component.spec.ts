import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { MaterialsModule } from "../../modules";
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppComponent, HeaderComponent, SidebarComponent],
			imports: [MaterialsModule, RouterTestingModule]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
