import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'nwn-save-scenario',
    templateUrl: './save-scenario.component.html',
    styleUrls: ['./save-scenario.component.css'],
})
export class SaveScenarioComponent {
    @Output()
    saveScenarioEvent = new EventEmitter()

    saveScenario(){
        this.saveScenarioEvent.emit({
            "name" : "promo-save-1",
            "comments":"saving scenario with retails and product group" 
        })
    }

}
