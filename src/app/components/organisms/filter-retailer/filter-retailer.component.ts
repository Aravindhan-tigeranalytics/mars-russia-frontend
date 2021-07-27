import { Component, OnInit, Input,EventEmitter, Output  } from '@angular/core';
import {CheckboxModel} from "../../../core/models"
import {ModalApply} from "../../../shared/modal-apply.component"

// export class ModalApply{
//   @Output()
//   closeModal = new EventEmitter()

//   apply(){
//     // debugger
//     this.closeModal.emit({"class" : this})
//   }

// }

@Component({
  selector: 'nwn-filter-retailer',
  templateUrl: './filter-retailer.component.html',
  styleUrls: ['./filter-retailer.component.css']
})
export class FilterRetailerComponent extends ModalApply implements OnInit  {
  // checked = fals searchText = "";

  @Input()
  retailers:Array<CheckboxModel> = []
  @Input()
  cont:Array<any> = []
  @Output()
  retailerChange = new EventEmitter()
  

  constructor() {
    super()
   }

  ngOnInit(): void {
    
    console.log(this.cont , "cont value in filters")
  }
  valueChangeSelect(event:any){
    this.retailerChange.emit(event)
  }
  // inputChangeEvent(event:any){
  //   this.searchText = event
  // }
  

}
