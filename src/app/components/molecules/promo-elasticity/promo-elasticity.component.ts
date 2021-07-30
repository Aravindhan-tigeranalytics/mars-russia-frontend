import { Component } from '@angular/core';

@Component({
    selector: 'nwn-promo-elasticity',
    templateUrl: './promo-elasticity.component.html',
    styleUrls: ['./promo-elasticity.component.css'],
})
export class PromoElasticityComponent {
    constructor() {}
    disable = false
    counter = 0;

    onInputChange(val){
        this.counter = Number(val)
        console.log(val , "promo elsticity change")

    }

    increment() {
        this.counter = Number((this.counter + 0.1).toFixed(1));
    }

    decrement() {
        this.counter = Number((this.counter - 0.1).toFixed(1));
        if(this.counter<0){
            this.disable = true
        }
    }
}
