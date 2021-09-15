import { Component } from '@angular/core';

@Component({
    selector: 'nwn-price-elasticity',
    templateUrl: './price-elasticity.component.html',
    styleUrls: ['./price-elasticity.component.css'],
})
export class PriceElasticityComponent {
    constructor() {}

    counter = 0;

    increment() {
        this.counter++;
    }

    decrement() {
        this.counter--;
    }
}
