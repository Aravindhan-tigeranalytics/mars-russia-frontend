import { Component, Input } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
    selector: 'nwn-pricing-metric',
    templateUrl: './pricing-metric.component.html',
    styleUrls: ['./pricing-metric.component.css'],
})
export class PricingMetricComponent {
    constructor() {}
    @Input()
    percentage = false;

    @Input()
    counterPer = 18.02;
    @Input()
    label = "List Price"

    enabled = "abs"


    changeEnabled(type){
        this.enabled = type
        // if(type == 'per'){
        //     this.enabled = type

        // }
        // else{


        // }

    }

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

    config = {
        weekDayFormat: 'd',
        weekDayFormatter: (num) => {
            if (num === 0) {
                return 'S';
            } else if (num === 1) {
                return 'M';
            } else if (num === 2) {
                return 'T';
            } else if (num === 3) {
                return 'W';
            } else if (num === 4) {
                return 'T';
            } else if (num === 5) {
                return 'F';
            } else if (num === 6) {
                return 'S';
            } else {
                return 'S';
            }
        },
    };
}
