import { Component , OnInit } from '@angular/core';
import { ModalService } from '@molecules/modal/modal.service';
import {OptimizerService} from '../../../core/services/optimizer.service'
import { ListPromotion} from "../../../core/models"

@Component({
    selector: 'nwn-compare-promo-scenario',
    templateUrl: './compare-promo-scenario.component.html',
    styleUrls: ['./compare-promo-scenario.component.css'],
})
export class ComparePromoScenarioComponent implements OnInit {

    list_promotion:Array<ListPromotion> = []
    list_promotion_promo:Array<ListPromotion> = []
    list_promotion_optimizer:Array<ListPromotion> = []
    selected_id:Array<number> = []
    openTab = 2;

    constructor(private modal : ModalService,private optimize : OptimizerService,){

    }
    ngOnInit(): void {
        this.optimize.fetch_load_scenario().subscribe(data=>{
            this.list_promotion = data
            this.list_promotion_promo = this.list_promotion.filter(data=>data.scenario_type == "promo")
            this.list_promotion_optimizer = this.list_promotion.filter(data=>data.scenario_type == "optimizer")
        })

    }
    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;
    }
    toggleId(id:number){
        console.log(id)
        if(this.selected_id.includes(id)){
            this.selected_id = this.selected_id.filter(n=>n!=id)
        }
        else{
            this.selected_id.push(id)
        }
        console.log(this.selected_id , "selected id selecting")

    }
    openComparePopup(){
        this.optimize.setCompareScenarioIdObservable(this.selected_id)
        console.log(this.selected_id , "selected save id")
        this.modal.close('compare-promo-scenario')
this.modal.open('compare-scenario-popup')
    }
}
