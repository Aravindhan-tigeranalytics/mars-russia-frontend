import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'nwn-promo-header',
    templateUrl: './promo-header.component.html',
    styleUrls: ['./promo-header.component.css'],
})
export class PromoHeaderComponent {
    currentRoute = '';

    constructor(location: Location, router: Router) {
        router.events.subscribe((val) => {
            if (location.path() != '') {
                this.currentRoute = location.path();
            } else {
                this.currentRoute = '';
            }
        });
    }

    ngOnInit() {}
}
