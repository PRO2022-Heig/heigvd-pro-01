import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ApiModule } from "../../../api";
import { MaterialsModule } from "../../../modules";
import { UserProfileComponent } from "./user-profile.component";

describe("UserProfileComponent", () => {
	let component: UserProfileComponent;
	let fixture: ComponentFixture<UserProfileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserProfileComponent],
			imports: [ApiModule, MaterialsModule, RouterTestingModule]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UserProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
