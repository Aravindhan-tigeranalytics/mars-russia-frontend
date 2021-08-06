import { Component,Input, Output,EventEmitter } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
// import { EventEmitter } from 'stream';

@Component({
    selector: 'nwn-mac-popup',
    templateUrl: './mac-popup.component.html',
    styleUrls: ['./mac-popup.component.css'],
})
export class MacPopupComponent {

    

    @Input()
    floor = 0
    @Input()
    ceil = 2
    @Input()
    steps = 0.1

    @Input()
    label = ""
   
    @Output()
    configChangeEvent = new EventEmitter()
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

    sliderChangeEvent($event){
        this.configChangeEvent.emit({
            "label" : this.label,
            "event" : $event
        })


    }
    
}
