import { Component } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
    selector: 'nwn-pricing-metric',
    templateUrl: './pricing-metric.component.html',
    styleUrls: ['./pricing-metric.component.css'],
})
export class PricingMetricComponent {
    constructor() {}

    counterPer = 18.02;

    incrementPer() {
        this.counterPer++;
    }

    decrementPer() {
        this.counterPer--;
    }

    counter = 1.05;

    increment() {
        this.counter++;
    }

    decrement() {
        this.counter--;
    }
}
