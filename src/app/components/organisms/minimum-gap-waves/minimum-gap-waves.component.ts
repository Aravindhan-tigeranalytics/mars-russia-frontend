import { Component,Output , EventEmitter, Input } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
    selector: 'nwn-minimum-gap-waves',
    templateUrl: './minimum-gap-waves.component.html',
    styleUrls: ['./minimum-gap-waves.component.css'],
})
export class MinimumGapWavesComponent {


    @Input()
    floor = 0
    @Input()
    ceil = 52
    @Input()
    steps = 1

    @Output()
    paramGapEvent = new EventEmitter()
    @Input()
    basepromo = 0
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
        this.paramGapEvent.emit($event)

        // min_val: 0, max_val: 12
        console.log($event , "slider change event")
    }
}
