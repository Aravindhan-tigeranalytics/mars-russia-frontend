import { Component, Input , OnInit } from '@angular/core';
import {OptimizerService} from '../../../core/services/optimizer.service'
import { ListPromotion} from "../../../core/models"
@Component({
    selector: 'nwn-scenario-load-card',
    templateUrl: './scenario-load-card.component.html',
    styleUrls: ['./scenario-load-card.component.css'],
})
export class ScenarioLoadCardComponent  implements OnInit{

    list_promotion:Array<ListPromotion> = []

    constructor(private optimize : OptimizerService,){

    }
    ngOnInit(): void {
        // this.optimize.fetch_load_scenario().subscribe(data=>{
        //     this.list_promotion = data
        // })

    }
    @Input()
    showInfo: boolean = false;
    @Input()
    showTrash: boolean = false;
    @Input()
    showCheckbox: boolean = false;
    @Input()
    showSubHead: boolean = false;
}
