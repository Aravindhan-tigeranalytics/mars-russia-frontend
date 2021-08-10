import { Component,Input,Output,EventEmitter } from '@angular/core';
import { ListPromotion } from '@core/models';

@Component({
    selector: 'nwn-promo-simulator-scenario',
    templateUrl: './promo-simulator-scenario.component.html',
    styleUrls: ['./promo-simulator-scenario.component.css'],
})
export class PromoSimulatorScenarioComponent {

    @Input()
    promotion_viewed : ListPromotion = null as any
    @Output()
    deleteClicked =  new EventEmitter()
    @Output()
    confirmatonEventModal = new EventEmitter()
    deleteClickedEvent($event){
        this.deleteClicked.emit(this.promotion_viewed)

        // console.log(this.promotion_viewed , "delete event")
    }

    buttonClickedEvent($event){
        console.log($event , "button clicked at delete alert")
        this.confirmatonEventModal.emit($event)

    }
}
