import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from "rxjs";

import { BaseComponent } from "../../../_lib/_basics";

import { sleep } from "../../../../../helpers";
import { AuthService } from "../../../../api/auth";
import { EventService } from "../../../../api/event";
import { Meal, MealService } from "../../../../api/meal";
import { User } from "../../../../api/user";
import { EventHelped } from "../../user-event-group.helper";
import { EventHelpedMeal } from "../user-events.component";

interface EventForm extends FormGroup {
	controls: {
		name: FormControl;
		description: FormControl;
	};

	value: {
		[K in keyof EventForm["controls"]]: EventForm["controls"][K]["value"];
	};
}

interface MealForm extends FormGroup {
	controls: {
		meal: FormControl;
		search: FormControl;
	};

	value: {
		[K in keyof EventForm["controls"]]: EventForm["controls"][K]["value"];
	};
}

@Component({
	selector: "app-user-event",
	templateUrl: "./user-event.component.html",
	styleUrls: ["./user-event.component.scss"]
})
export class UserEventComponent extends BaseComponent implements OnInit, OnChanges {
	@Input()
	public event!: EventHelpedMeal;
	public user!: User;
	public meals: Meal[] = [];

	public readonly state = {
		edit: false,
		loading: false
	};

	public readonly mealState = {
		loading: false
	};

	public readonly eventForm: EventForm;
	public readonly mealForm: MealForm;

	/**
	 * When an event disappears, It does not need to stay visible
	 */
	@Output()
	private eventDisappears = new EventEmitter<EventHelped>();

	public constructor(
		private readonly authService: AuthService,
		private readonly eventService: EventService,
		private readonly mealService: MealService) {
		super();

		this.eventForm = new FormGroup({
			name: new FormControl("", [Validators.required]),
			description: new FormControl("")
		} as EventForm["controls"]) as EventForm;

		this.mealForm = new FormGroup({
			meal: new FormControl(),
			search: new FormControl()
		} as MealForm["controls"]) as MealForm;
	}

	public ngOnInit() {
		this.addSubscriptions(
			this.authService.getUser().subscribe(_ => this.user = _),
			this.mealForm.controls.search.valueChanges.pipe(
				tap(() => this.mealState.loading = true),
				debounceTime(500),
				// Do not search with empty string
				filter((_: string) => !!_),
				distinctUntilChanged(),
				switchMap(text =>
					this.mealService.find({name: text})
						.catch(() => [])
						.finally(() => this.mealState.loading = false)
				)
			).subscribe(meals => this.meals = meals)
		);

		this.toggleFormState();
	}

	public ngOnChanges() {
		this.eventForm.controls.name.setValue(this.event.name);
		this.eventForm.controls.description.setValue(this.event.description);

		if (this.event._meal) {
			this.mealForm.controls.meal.setValue(this.event._meal);
			this.meals = [this.event._meal];
		}
	}

	public async updateEvent() {
		if (!this.state.edit || this.state.loading || !this.eventForm.valid)
			return;

		this.state.loading = true;
		this.toggleFormState();

		return this.eventService.update({
			id: this.event.id,
			name: this.eventForm.controls.name.value,
			description: this.eventForm.controls.description.value
		})
			.then(_ => sleep(250).then(() => _))
			.then(event => {
				this.event.name = event.name;
				this.event.description = event.description;
			})
			.finally(() => {
				this.state.edit = false;
				this.state.loading = false;
				this.toggleFormState();
			});
	}

	public toggleFormState() {
		if (!this.state.edit || this.state.loading)
			this.eventForm.disable();
		else
			this.eventForm.enable();
	}

	public updateMeal() {
		const meal: Meal | undefined = this.mealForm.controls.meal.value;

		return this.eventService.update({
			id: this.event.id,
			meal: meal?.["@id"]//meal ? this.mealService.encodeEntityName(meal) : undefined
		}).then(event => {
			this.event.meal = event.meal;
			this.event._meal = meal;
		});
	}
}
