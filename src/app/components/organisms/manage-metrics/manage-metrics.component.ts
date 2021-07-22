import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from '@molecules/modal/modal.service';
import {CheckboxModel} from "../../../core/models"

@Component({
  selector: 'nwn-manage-metrics',
  templateUrl: './manage-metrics.component.html',
  styleUrls: ['./manage-metrics.component.css']
})
export class ManageMetricsComponent implements OnInit {
 
  sales_metrics:Array<CheckboxModel> = [
    {"value":"Units","checked":true},
    {"value":"Base Units","checked":true},
    {"value":"Inc. Units","checked":true},
    {"value":"Volume","checked":true}
  ]
  mars_metrics:Array<CheckboxModel> = [
    {"value":"LSV","checked":true},
    {"value":"NSV Units","checked":true},
    {"value":"MAC","checked":true},
    {"value":"MAC, %NSV","checked":true},
    {"value":"TE, % LSV","checked":true},
    {"value":"TE / Unit","checked":true},
    {"value":"ROI","checked":true},
    {"value":"Lift %","checked":true},
    {"value":"ASP","checked":true},
    {"value":"Promo ASP","checked":true},
    {"value":"RSV w/o VAT","checked":true},
    {"value":"Customer Margin","checked":true}
  ]
  selected_metrics : Array<string> = [...this.mars_metrics.map(val=>val.value),...this.mars_metrics.map(val=>val.value)]
  @Output()
  metricChanges = new EventEmitter();

  constructor(private modal : ModalService ,) {}

  changeMetrics(e:CheckboxModel){
    console.log(e , "change metric on checkbox change")
    if(e.checked){
      this.selected_metrics.push(e.value)

    }
    else{
      this.selected_metrics = this.selected_metrics.filter(val=>val!=e.value)
    }
    
    console.log(this.selected_metrics, "change metric on checkbox change")

  }

  ngOnInit(): void {
  }
  closeModal(){
    console.log(this.selected_metrics , "selected metrics")
    this.metricChanges.emit(this.selected_metrics)
    this.modal.close('manage-metrics')
  }

}
