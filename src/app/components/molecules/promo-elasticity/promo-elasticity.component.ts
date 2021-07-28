import { Component } from '@angular/core';

@Component({
    selector: 'nwn-promo-elasticity',
    templateUrl: './promo-elasticity.component.html',
    styleUrls: ['./promo-elasticity.component.css'],
})
export class PromoElasticityComponent {
    constructor() {}

    counter = 0;

    increment() {
        this.counter = Number((this.counter + 0.1).toFixed(1));
    }

    decrement() {
        this.counter = Number((this.counter - 0.1).toFixed(1));
    }
}
