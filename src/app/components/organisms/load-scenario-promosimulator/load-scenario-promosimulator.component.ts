import { Component,OnInit } from '@angular/core';
import {OptimizerService} from '../../../core/services/optimizer.service'
import { ListPromotion} from "../../../core/models"
import { ModalService } from '@molecules/modal/modal.service';

@Component({
    selector: 'nwn-load-scenario-promosimulator',
    templateUrl: './load-scenario-promosimulator.component.html',
    styleUrls: ['./load-scenario-promosimulator.component.css'],
})
export class LoadScenarioPromosimulatorComponent implements OnInit {
    selectedIndex!: number;
    loadPromoSimulatorItems: any[] = [
        {
            slcHead: 'Promo scenario name',
            slcContent:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi enim ultrices eget donec in nunc, mi nisl elit. Nibh proin vitae faucibus tempor mauris, justo. Turpis adipiscing egestas.',
        },
        {
            slcHead: 'Promo scenario name',
            slcContent:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi enim ultrices eget donec in nunc, mi nisl elit. Nibh proin vitae faucibus tempor mauris, justo. Turpis adipiscing egestas.',
        },
    ];


    list_promotion:Array<ListPromotion> = []

    constructor(private optimize : OptimizerService,private modal : ModalService){

    }
    ngOnInit(): void {
        // this.optimize.fetch_load_scenario().subscribe(data=>{
        //     this.list_promotion = data
        // })

    }
    select(index: number) {
        this.selectedIndex = index;
    }
    loadScenario(){
        this.modal.close('load-scenario-promosimulator')

        // load-scenario-promosimulator
   
    }  

   

    
}
