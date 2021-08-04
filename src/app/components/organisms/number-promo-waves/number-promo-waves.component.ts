import { Component, Input , Output , EventEmitter } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
    selector: 'nwn-number-promo-waves',
    templateUrl: './number-promo-waves.component.html',
    styleUrls: ['./number-promo-waves.component.css'],
})
export class NumberPromoWavesComponent {
    @Input()
    minValue = 0;

    @Input()
    maxValue = 52;

    @Input()
    floor = 0
    @Input()
    ceil = 52
    @Input()
    steps = 1

    @Input()
    basepromo = 0

    @Output()
    promoWaveEvent = new EventEmitter()


    @Input()
    options: Options = {
        floor: this.floor,
        ceil: this.ceil,
        step : this.steps,
        showSelectionBar: true,
        translate: (value: number, label: LabelType): string => {
            console.log("value" , value)
            
            
            switch (label) {
                case LabelType.Ceil:
                    return value + ' weeks';
                case LabelType.Floor:
                    return value + ' weeks';
                default:
                    return '' + value;
            }
        },
    }
    duration_min = 0
    duration_max = 0
    value = "0 - 0"

    sliderChangeEvent($event){
        this.duration_max = $event['max_val']
        this.duration_min = $event['min_val']
        this.value = this.duration_min + " - " + this.duration_max
        this.promoWaveEvent.emit($event)

        // min_val: 0, max_val: 12
        console.log($event , "slider change event")
    }

}
