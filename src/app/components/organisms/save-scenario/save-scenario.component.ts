import { Component, OnInit,EventEmitter, Output,forwardRef, Input } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR,FormGroup, FormControl, Validators } from '@angular/forms'
import { OptimizerService } from '@core/services';
import { SimulatorService } from '@core/services/simulator.service';


@Component({
    selector: 'nwn-save-scenario',
    templateUrl: './save-scenario.component.html',
    styleUrls: ['./save-scenario.component.css'],
   
})
export class SaveScenarioComponent implements OnInit{
    @Output()
    saveScenarioEvent = new EventEmitter()
    @Input()
    showSave: boolean | false | true = false
    @Input()
    error :any = null
    @Input()
    loadScenarioData: any = null
    
    saveForm = new FormGroup({
        name: new FormControl(),
        comment: new FormControl(),
    })

    constructor(private restApi: SimulatorService,public optimize : OptimizerService){}

    ngOnInit() {
        this.restApi.getIsSaveScenarioLoadedObservable().subscribe(data=>{
            console.log(data,"load scenario save flag")
            if(data != ''){
                this.optimize.getLoadedScenarioModel().subscribe(scenarioData=>{
                    this.saveForm.patchValue({
                        name: scenarioData.scenario_name,
                        comment: scenarioData.scenario_comment
                    });
                })
            }
            else {
                this.saveForm.patchValue({
                    name:  '',
                    comment: ''
                });
            }
        })
    }
     
    saveScenario($event){
        if($event == 'saveas'){
            console.log(this.saveForm.value , "form value")
            this.saveScenarioEvent.emit({
                "name" : this.saveForm.get('name')?.value,
                "comments":this.saveForm.get("comment")?.value,
                "type": 'saveas'
            })
        }
        else if($event == 'save'){
            this.saveScenarioEvent.emit({
                "name" : this.saveForm.get('name')?.value,
                "comments":this.saveForm.get("comment")?.value,
                "type": 'save'
            })
        }
    }
    

}
