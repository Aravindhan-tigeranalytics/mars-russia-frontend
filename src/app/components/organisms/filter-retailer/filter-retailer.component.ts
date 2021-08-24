import { Component, OnInit, Input,EventEmitter, Output  } from '@angular/core';
import { SimulatorService } from '@core/services/simulator.service';
import { tickStep } from 'd3';
import {CheckboxModel, FilterModel} from "../../../core/models"
import {ModalApply} from "../../../shared/modal-apply.component"

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
  @Input()
  filter_model : FilterModel
  
  placeholder:any = 'Search retailers'
  retailerSelected:any = ''

  constructor(public restApi: SimulatorService) {
    super()
   }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      
      if(data=="filter-retailer"){
        
      this.searchText = ""

      if(this.filter_model.retailer == "Retailers"){
        console.log(this.retailers , "retailers after backdrop")
        console.log(this.retailerSelected , "retailer selected.................................")

        this.retailers.forEach(element => {
          element.checked = false
          
        });
        
        this.valueChangeSelect({...this.retailerSelected , ...{"checked" : false}})
      }

      }
    
      
      

    })
    console.log(this.cont , "cont value in filters")
  }
  valueChangeSelect(event:any){
    this.retailerSelected = event
    this.retailerChange.emit(event)
   
  }
  apply(id){

    this.filterApply.emit({"key" : "Retailer"})
    this.closeModal.emit(id)
    this.searchText = ""
  }


}
