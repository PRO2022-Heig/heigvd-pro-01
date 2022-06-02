import { Directive, OnDestroy } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Observable, Subscription, TeardownLogic } from "rxjs";

/**
 * Component with subscription(s)
 */
@Directive() // Empty directive for angular
export abstract class BaseComponent implements OnDestroy {
	protected readonly subscriptions: Subscription = new Subscription();

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	/**
	 * Return the error message for a form control
	 */
	public getControlErrorMessage(control: AbstractControl): Observable<string> {
		// As Observable if there's updates on the control and if l10n is implemented
		return new Observable<string>(subscriber =>
			subscriber.next(this.getErrorMessage(control))
		);
	}

	/**
	 * Add subscription from a component. They will be unsubscribed at the destruction.
	 */
	protected addSubscriptions(...subscriptions: TeardownLogic[]) {
		for (const subscription of subscriptions)
			this.subscriptions.add(subscription);
	}

	private getErrorMessage(control: AbstractControl): string {
		if (control.errors?.required)
			return "Ce champ est requis.";
		else if (control.errors?.email)
			return "Le mail entré n'est pas correct.";
		else if (control.errors?.minlength)
			return `Au moins ${control.errors.minlength.requiredLength} lettres sont nécessaires.`;
		else if (control.errors?.maxlength)
			return `Pas plus de ${control.errors.maxlength.requiredLength} lettres.`;
		else if (control.errors?.min)
			return `La valeur doit être au minimum ${control.errors.min.min}.`;
		else if (control.errors?.max) // Need to change if global
			return `La valeur doit être au maximum ${control.errors.max.max}.`;
		else if (control.errors?.integerOnly)
			return `La valeur doit être entière.`;

		return "Ce champ n'est pas correctement rempli.";
	}
}
