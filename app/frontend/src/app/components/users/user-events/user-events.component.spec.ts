import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ApiTestProviders } from "../../../../../test/helpers/api";
import { ApiModule } from "../../../api";
import { MaterialsModule } from "../../../modules";
import { UserEventsComponent } from "./user-events.component";

describe("UserEventsComponent", () => {
	let component: UserEventsComponent;
	let fixture: ComponentFixture<UserEventsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserEventsComponent],
			imports: [ApiModule, MaterialsModule, RouterTestingModule],
			providers: ApiTestProviders
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UserEventsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
