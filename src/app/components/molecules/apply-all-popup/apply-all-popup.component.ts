import { Component, Input, Output , EventEmitter } from '@angular/core';
import { CheckboxModel } from '@core/models';

@Component({
    selector: 'apply-all-popup',
    templateUrl: './apply-all-popup.component.html',
    styleUrls: ['./apply-all-popup.component.css'],
})
export class ApplyAllPopupComponent {

    @Input() metric;
    @Output()
    applyCloseEvent= new EventEmitter()

    @Input()
    group:CheckboxModel[] = []

    applyElasticity = 0;
    applyDate;

    valueChange($event){
        console.log($event)
        this.group.find(d=>d.value == $event['value'])!['checked'] = $event['checked']
        // console.log(this.group)
    }

    applyAllClose(form){
        console.log(form , "form values raw")
        console.log(form.value , "form values")
        console.log(this.group , "group after checkeing ")
        // date: Moment, applyElasticity: 2
        // console.log(form , "apply close form")
        this.applyCloseEvent.emit({
            "metric" : this.metric,
             "value" : form.value,
             "products" : this.group
        })
        this.applyElasticity = 0
        this.applyDate = null
        // form.resetForm()

    }

}
