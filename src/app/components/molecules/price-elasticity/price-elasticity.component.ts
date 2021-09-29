import { Input } from "@angular/core";
import { Component, } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR, } from '@angular/forms'


@Component({
    selector: 'nwn-price-elasticity',
    templateUrl: './price-elasticity.component.html',
    styleUrls: ['./price-elasticity.component.css'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          multi:true,
          useExisting: PriceElasticityComponent
        }
      ]
})
export class PriceElasticityComponent implements ControlValueAccessor  {
    constructor() {}

    @Input()
    counter = 0;
    @Input()
    base = 0

    onChange = (quantity) => {};

  onTouched = () => {};


    increment() {
        this.counter++;
        this.counter = Number((this.counter).toFixed(2))
        this.onChange(this.counter)
    }

    decrement() {
        this.counter--;
        this.counter = Number((this.counter).toFixed(2))
        this.onChange(this.counter)
    }
    writeValue(quantity: number) {
        this.counter = quantity;
      }
    
      registerOnChange(onChange: any) {
        this.onChange = onChange;
      }
    
      registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
      }

}
