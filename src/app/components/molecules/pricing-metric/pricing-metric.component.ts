import { Component } from '@angular/core';
// import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
    selector: 'nwn-pricing-metric',
    templateUrl: './pricing-metric.component.html',
    styleUrls: ['./pricing-metric.component.css'],
})
export class PricingMetricComponent {
    constructor() {}

    counterPer = 0;

    incrementPer() {
        this.counterPer++;
    }

    decrementPer() {
        this.counterPer--;
    }

    counter = 0;

    increment() {
        this.counter++;
    }

    decrement() {
        this.counter--;
    }

    // dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    //     // Only highligh dates inside the month view.
    //     if (view === 'month') {
    //         const date = cellDate.getDate();

    //         // Highlight the 1st and 20th day of each month.
    //         return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    //     }

    //     return '';
    // };
}
