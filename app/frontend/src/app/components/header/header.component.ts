import { Component, EventEmitter, Output } from "@angular/core";

@Component({
	selector: "app-header",
	styleUrls: ["./header.component.scss"],
	templateUrl: "./header.component.html"
})
export class HeaderComponent {
	@Output()
	public menuClick = new EventEmitter();
}
