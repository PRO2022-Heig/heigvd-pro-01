import { Component, HostBinding, HostListener, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
	selector: "app-root",
	styleUrls: ["./app.component.scss"],
	templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
	// TODO: get from modules
	private static readonly XS_SIZE = 600;

	/**
	 * Is the screen considered as a XS_SIZE
	 */
	private isXsSize = false;
	/**
	 * Last value stored of "scroll top"
	 */
	private lastScrollTop = 0;

	@HostBinding("class.scrolled-down")
	private isScrollingDown = false;

	@HostBinding("class.scrolled-up")
	private get isScrollingUp() {
		return !this.isScrollingDown;
	}

	@ViewChild(MatSidenav, {static: true})
	private readonly matSidenav!: MatSidenav;

	public async ngOnInit() {
		// No need to unsubscribe
		this.matSidenav.openedStart.subscribe(this.controlBodyScroll.bind(this));
		this.matSidenav.closedStart.subscribe(this.controlBodyScroll.bind(this));

		this.onResize();
	}

	private controlBodyScroll() {
		document.body.style.overflowY = AppComponent.XS_SIZE && this.matSidenav.opened ? "hidden" : "";
	}

	@HostListener("window:resize")
	private onResize() {
		// Using the MediaObserver lets the user see the sidenav close.
		const before = this.isXsSize;
		this.isXsSize = window.innerWidth < AppComponent.XS_SIZE;

		if (this.isXsSize) {
			this.matSidenav.mode = "over";

			if (this.isXsSize !== before)
				this.matSidenav.close().then();
		} else {
			this.matSidenav.mode = "side";

			if (!this.matSidenav.opened)
				this.matSidenav.open().then();
		}

		this.controlBodyScroll();
	}

	@HostListener("window:scroll")
	private onScroll() {
		// TODO: https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
		//	Stop scrolling when sidenav is open
		const st = window.pageYOffset || document.documentElement.scrollTop;

		this.isScrollingDown = st > this.lastScrollTop;

		// For Mobile or negative scrolling
		this.lastScrollTop = st <= 0 ? 0 : st;
	}
}
