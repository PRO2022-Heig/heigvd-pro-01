import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ApiTestProviders } from "../../../../../test/helpers/api";
import { ApiModule } from "../../../api";
import { MaterialsModule } from "../../../modules";
import { UserGroupsComponent } from "./user-groups.component";

describe("UserGroupsComponent", () => {
	let component: UserGroupsComponent;
	let fixture: ComponentFixture<UserGroupsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserGroupsComponent],
			imports: [ApiModule, MaterialsModule],
			providers: ApiTestProviders
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UserGroupsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
