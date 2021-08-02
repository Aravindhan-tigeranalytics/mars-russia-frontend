import { Component , Output , EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'nwn-duration-promo-waves',
    templateUrl: './duration-promo-waves.component.html',
    styleUrls: ['./duration-promo-waves.component.css'],
})
export class DurationPromoWavesComponent {
    @Output()
    durationWavesEvent = new EventEmitter()
    @Input()
    basepromo = 0

    duration_min = 0
    duration_max = 0
    value = "0 - 0"


    sliderChangeEvent($event){
        this.duration_max = $event['max_val']
        this.duration_min = $event['min_val']
        this.value = this.duration_min + " - " + this.duration_max
        this.durationWavesEvent.emit($event)

        // min_val: 0, max_val: 12
        console.log($event , "slider change event")
    }
}
