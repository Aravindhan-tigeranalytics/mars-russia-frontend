import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ModalService } from '@molecules/modal/modal.service';
import {OptimizerService} from '../../../core/services/optimizer.service'
import { LoadedScenarioModel } from 'src/app/core/models';
import { Observable, of, from, BehaviorSubject, combineLatest } from 'rxjs';
@Component({
    selector: 'nwn-compare-scenario-popup',
    templateUrl: './compare-scenario-popup.component.html',
    styleUrls: ['./compare-scenario-popup.component.css'],
})
export class CompareScenarioPopupComponent implements OnInit {
    constructor(private _location: Location,private modal : ModalService , private optimizer : OptimizerService
        ) {}

    public screenWidth: any;
    public screenHeight: any;
    loaded_scenario : Array<LoadedScenarioModel> = []

    ngOnInit(): void {
        this.optimizer.getCompareScenarioObservable().subscribe(data=>{
            
            if(data.length > 0){
                console.log(data , "comparescenario datas")

                    this.loaded_scenario = data
                
            }
            // data.forEach(n=>{
            //     this.optimizer.fetch_load_scenario_by_id(n).subscribe(data=>{
            //         console.log(data ," data to compare result" , n)
            //         if(data){
            //             this.loaded_scenario.push(data)
            //         }

            //     })

            // })
           
        })
       
        this.screenWidth = window.innerWidth - 2;
        this.screenHeight = window.innerHeight;
    }
    openTab = 1;
    deleteCompareEvent($event){
        console.log("deleting event " , $event.id)
        this.optimizer.deleteCompareScenario($event.id)
    }
    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;
    }
    openAdd(){
        this.modal.open('compare-promo-scenario')
        // id="compare-promo-scenario"
    }
    backClicked() {
        this.modal.close('compare-scenario-popup')
        
        // this._location.back();
    }
}
