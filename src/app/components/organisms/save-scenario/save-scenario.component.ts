import { Component, OnInit,EventEmitter, Output,forwardRef, Input } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR,FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
    selector: 'nwn-save-scenario',
    templateUrl: './save-scenario.component.html',
    styleUrls: ['./save-scenario.component.css'],
   
})
export class SaveScenarioComponent {
    @Output()
    saveScenarioEvent = new EventEmitter()
    @Input()
    error :any = null
    saveForm = new FormGroup({
        name: new FormControl(),
        comment: new FormControl(),
      })

    saveScenario(){
        console.log(this.saveForm.value , "form value")
// debugger
        this.saveScenarioEvent.emit({
            "name" : this.saveForm.get('name')?.value,
            "comments":this.saveForm.get("comment")?.value
        })
    }
    

}
