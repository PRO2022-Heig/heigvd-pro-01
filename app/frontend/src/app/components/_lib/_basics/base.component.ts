import { Directive, OnDestroy } from "@angular/core";
import { Subscription, TeardownLogic } from "rxjs";

/**
 * Component with subscription(s)
 */
@Directive() // Empty directive for angular
export abstract class BaseComponent implements OnDestroy {
	protected readonly subscriptions: Subscription = new Subscription();

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	protected addSubscriptions(...subscriptions: TeardownLogic[]) {
		for (const subscription of subscriptions)
			this.subscriptions.add(subscription);
	}
}
