import { Component, OnInit } from '@angular/core';
import { ListPromotion } from '@core/models';
import {OptimizerService , PricingService} from "@core/services"
@Component({
    selector: 'nwn-load-scenario-pricingtool-popup',
    templateUrl: './load-scenario-pricingtool-popup.component.html',
    styleUrls: ['./load-scenario-pricingtool-popup.component.css'],
})
export class LoadScenarioPricingtoolPopupComponent implements OnInit {
    selectedIndex!: number;
    list_promotion:Array<ListPromotion> = []
    constructor(private optimizerService : OptimizerService , private pricingService : PricingService) {
        this.optimizerService.fetch_load_scenario()
    }

    ngOnInit() {

        this.optimizerService.getListObservation().subscribe(data=>{
            if(data){
                this.list_promotion = data.filter(data=>data.scenario_type == "pricing")
            }
            console.log(data , "LIST PROMOTION observable")
        })
    }

    loadPricingSimulatorItems: any[] = [
        {
            slcHead: 'Pricing scenario name',
            slcContent:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi enim ultrices eget donec in nunc, mi nisl elit. Nibh proin vitae faucibus tempor mauris, justo. Turpis adipiscing egestas.',
        },
        {
            slcHead: 'Pricing scenario name',
            slcContent:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi enim ultrices eget donec in nunc, mi nisl elit. Nibh proin vitae faucibus tempor mauris, justo. Turpis adipiscing egestas.',
        },
    ];

    select(index: number) {
        this.selectedIndex = index;
    }
}
