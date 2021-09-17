import { Component , Input } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
    selector: 'nwn-pricing-metric',
    templateUrl: './pricing-metric.component.html',
    styleUrls: ['./pricing-metric.component.css'],
})
export class PricingMetricComponent {
    constructor() {}
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
}
