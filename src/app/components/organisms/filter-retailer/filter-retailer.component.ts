import { Component, OnInit, Input,EventEmitter, Output  } from '@angular/core';
import {CheckboxModel} from "../../../core/models"
@Component({
  selector: 'nwn-filter-retailer',
  templateUrl: './filter-retailer.component.html',
  styleUrls: ['./filter-retailer.component.css']
})
export class FilterRetailerComponent implements OnInit {
  // checked = false

  @Input()
  retailers:Array<CheckboxModel> = []
  @Input()
  cont:Array<any> = []
  @Output()
  retailerChange = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    
    console.log(this.cont , "cont value in filters")
  }
  valueChangeSelect(event:any){
    this.retailerChange.emit(event)
  }
  

}
