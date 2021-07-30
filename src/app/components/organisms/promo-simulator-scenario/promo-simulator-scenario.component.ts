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

    deleteClickedEvent($event){
        this.deleteClicked.emit(this.promotion_viewed)

        // console.log(this.promotion_viewed , "delete event")
    }
}
