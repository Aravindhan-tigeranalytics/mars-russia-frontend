import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { ModalService } from '@molecules/modal/modal.service';
import {OptimizerService} from '../../../core/services/optimizer.service'
import { LoadedScenarioModel } from 'src/app/core/models';
import { Observable, of, from, BehaviorSubject, combineLatest } from 'rxjs';
import * as FileSaver from 'file-saver';
import { color } from 'd3';

@Component({
    selector: 'nwn-compare-scenario-popup',
    templateUrl: './compare-scenario-popup.component.html',
    styleUrls: ['./compare-scenario-popup.component.css'],
})


export class CompareScenarioPopupComponent implements OnInit {

    CompareScenarioChartData:any = []
    legendColors:any = ['#0000a0','#00d7b9','#ffdc00','#a6db00','#9600ff','#ff32a0','#ff3c14','#ff8200']
    constructor(private _location: Location,private modal : ModalService , private optimizer : OptimizerService
        ) {
            this.CompareScenarioChartData = []
        }

    public screenWidth: any;
    public screenHeight: any;
    loaded_scenario : Array<LoadedScenarioModel> = []
    compare_scenario_data:any = []
    legendNames:any = []
    ngOnInit(): void {
        this.optimizer.getCompareScenarioObservable().subscribe(data=>{
            
            if(data.length > 0){
                console.log(data , "comparescenario datas")
                    this.loaded_scenario = data
                    this.CompareScenarioChartData = []
                    this.legendNames = []
                    if(this.loaded_scenario.length > 0){
                        this.CompareScenarioChartData = [
                            { "group": "LSV"},
                            { "group": "Trade Expense"},
                            { "group": "NSV"},
                            { "group": "COGS"},
                            { "group": "MAC"}, 
                            { "group": "RSV v/o VAT"}, 
                            { "group": "Customer Margin"}
                        ]
                        for(let i = 0; i < this.loaded_scenario.length; i++){
                            this.legendNames.push({'name': this.loaded_scenario[i].scenario_name,'color': this.legendColors[i]})
                            let key:any = 'simulated_'+JSON.stringify(i+1)
                            this.CompareScenarioChartData[0][key] = this.loaded_scenario[i]['simulated']['total']['lsv']
                            this.CompareScenarioChartData[1][key] = this.loaded_scenario[i]['simulated']['total']['te']
                            this.CompareScenarioChartData[2][key] = this.loaded_scenario[i]['simulated']['total']['nsv']
                            this.CompareScenarioChartData[3][key] = this.loaded_scenario[i]['simulated']['total']['cogs']
                            this.CompareScenarioChartData[4][key] = this.loaded_scenario[i]['simulated']['total']['mac']
                            this.CompareScenarioChartData[5][key] = this.loaded_scenario[i]['simulated']['total']['total_rsv_w_o_vat']
                            this.CompareScenarioChartData[6][key] = this.loaded_scenario[i]['simulated']['total']['rp']
                        }
                    }
                    // this.CompareScenarioChartData = [
                    //     { "group": "LSV", "simulated_1": this.loaded_scenario[0]['simulated']['total']['lsv'], },
                    //     { "group": "Trade Expense", "simulated_1": this.loaded_scenario[0]['simulated']['total']['te'] },
                    //     { "group": "NSV", "simulated_1": this.loaded_scenario[0]['simulated']['total']['nsv'] },
                    //     { "group": "COGS", "simulated_1": this.loaded_scenario[0]['simulated']['total']['cogs'] },
                    //     { "group": "MAC", "simulated_1": this.loaded_scenario[0]['simulated']['total']['mac'] }, 
                    //     { "group": "RSV v/o VAT", "simulated_1": this.loaded_scenario[0]['simulated']['total']['total_rsv_w_o_vat'] }, 
                    //     { "group": "Customer Margin", "simulated_1": this.loaded_scenario[0]['simulated']['total']['rp'] }
                    // ]
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

        
        this.optimizer.getCompareScenarioObservable().subscribe(data=>{
            if(data.length > 0){
                this.compare_scenario_data = data
            }
        })
        
        this.screenWidth = window.innerWidth - 2;
        this.screenHeight = window.innerHeight;
        console.log(this.screenWidth,this.screenHeight)
    }
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    downloadExcel(){
        if(this.compare_scenario_data.length > 0){
            this.optimizer.downloadCompareScenarioExcel(this.compare_scenario_data).subscribe((data: any) => {
                const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            
                FileSaver.saveAs(
                    blob,
                    'CompareScenario' + '_Export_' + new Date().getTime() + 'xlsx'
                  );
            })
        }
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
