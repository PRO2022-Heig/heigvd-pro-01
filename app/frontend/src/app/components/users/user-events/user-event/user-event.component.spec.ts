import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ApiTestProviders } from "../../../../../../test/helpers/api";
import { users } from "../../../../../../test/mocks/api";
import { ApiModule } from "../../../../api";
import { AuthService } from "../../../../api/auth";
import { EventService } from "../../../../api/event";
import { GroupService } from "../../../../api/group";
import { GroupUserMembershipService } from "../../../../api/group_user_memberships";
import { UserService } from "../../../../api/user";
import { MaterialsModule } from "../../../../modules";
import { getAllEventsGroups } from "../../user-event-group.helper";
import { UserEventComponent } from "./user-event.component";

describe("UserEventComponent", () => {
	let component: UserEventComponent;
	let fixture: ComponentFixture<UserEventComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserEventComponent],
			imports: [ApiModule, MaterialsModule],
			providers: ApiTestProviders
		})
			.compileComponents();
	});

	beforeEach(async () => {
		fixture = TestBed.createComponent(UserEventComponent);
		component = fixture.componentInstance;

		component.event = await getAllEventsGroups({
			eventService: TestBed.inject(EventService),
			groupService: TestBed.inject(GroupService),
			guMembershipService: TestBed.inject(GroupUserMembershipService),
			userService: TestBed.inject(UserService)
		}, await TestBed.inject(AuthService).login(users[0].emailAddress, users[0].password)).then(_ => _.events[0]);

		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
