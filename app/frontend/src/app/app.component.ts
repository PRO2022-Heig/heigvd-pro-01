import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable, switchMap, timer } from "rxjs";

import { environment } from "../environments/environment";

interface Result {
	date: string;
}

// This component is neither good nor bad. It is just an example.
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	public readonly TIME_MIN = 500;
	public time: number = 1000;
	public request?: Observable<Result>;

	public constructor(private httpClient: HttpClient) {
	}

	public ngOnInit() {
		this.setRequest();
	}

	public setRequest() {
		if (!+this.time) // wrong input
			this.time = 5000;
		if (this.time < this.TIME_MIN)
			this.time = this.TIME_MIN;

		this.request = timer(0, this.time).pipe(
			switchMap(() =>
				this.httpClient.get<Result>(`${environment.server}/api/time`)
			)
		);
	}
}
