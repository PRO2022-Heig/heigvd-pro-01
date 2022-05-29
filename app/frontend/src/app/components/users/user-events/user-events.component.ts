import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import { BaseComponent } from "../../_lib/_basics";

import { AuthService } from "../../../api/auth";
import { EventService } from "../../../api/event";
import { GroupService } from "../../../api/group";
import { GroupUserMembershipService } from "../../../api/group_user_memberships";
import { Meal, MealService } from "../../../api/meal";
import { User, UserService } from "../../../api/user";
import { EventHelped, getAllEventsGroups } from "../user-event-group.helper";
import { UserEventComponent } from "./user-event/user-event.component";

export interface EventHelpedMeal extends EventHelped {
	_meal?: Meal;
}

@Component({
	selector: "app-user-events",
	templateUrl: "./user-events.component.html",
	styleUrls: ["./user-events.component.scss"]
})
export class UserEventsComponent extends BaseComponent implements OnInit {
	public events: EventHelpedMeal[] = [];
	public loading = false;

	private user!: User;

	public constructor(
		private readonly authService: AuthService,
		private readonly eventService: EventService,
		private readonly groupService: GroupService,
		private readonly guMembershipService: GroupUserMembershipService,
		private readonly mealService: MealService,
		private readonly userService: UserService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly dialog: MatDialog
	) {
		super();
	}

	public async ngOnInit() {
		this.addSubscriptions(
			// The user is logged in, otherwise the authentication guard would have redirected the page.
			this.authService.getUser().subscribe(_ => this.user = _)
		);

		this.loading = true;
		this.events = await getAllEventsGroups({
			eventService: this.eventService,
			groupService: this.groupService,
			guMembershipService: this.guMembershipService,
			userService: this.userService
		}, this.user).then(_ => _.events).then(async (events: EventHelpedMeal[]) => {
			const eventsMeal = events.filter(_ => _.meal);

			const meals = eventsMeal.length ? await this.mealService.find({
				id: eventsMeal.map(_ => _.__meal as number)
			}) : [];

			for (const event of eventsMeal)
				event._meal = meals.find(_ => _.id === event.__meal);

			return events;
		});

		this.loading = false;

		this.addSubscriptions(
			this.activatedRoute.queryParams.subscribe(params => {
				if (params.id) {
					const event = this.events.find(_ => _.id === +params.id);
					if (event) {
						const ref = this.dialog.open(UserEventComponent);

						ref.componentInstance.event = event;
						ref.componentInstance.ngOnInit();
						ref.componentInstance.ngOnChanges();
					}
				}
			})
		);
	}

	public removedEvent(event: EventHelpedMeal) {
		this.events.splice(this.events.findIndex(_ => _.id === event.id), 1);
	}
}
