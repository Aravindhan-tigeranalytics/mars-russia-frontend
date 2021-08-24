import { Component, OnInit,Input,EventEmitter, Output  } from '@angular/core';
import { CheckboxModel, FilterModel } from '@core/models';
import { SimulatorService } from '@core/services/simulator.service';
import {ModalApply} from "../../../shared/modal-apply.component"

@Component({
  selector: 'nwn-filter-brands',
  templateUrl: './filter-brands.component.html',
  styleUrls: ['./filter-brands.component.css']
})
export class FilterBrandsComponent extends ModalApply implements OnInit {

  @Input()
  brands:Array<CheckboxModel> = []
  @Input()
  filter_model : FilterModel

  @Output()
  brandChange = new EventEmitter()

  placeholder:any = 'Search brands'
  constructor(public restApi: SimulatorService) {
    super()
   }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      if(data=="filter-brands"){
        console.log(data,"from modal apply")
      this.searchText = ""
      if(this.filter_model.brand == "Brands"){

        this.brands.forEach(element => {
          element.checked = false
          
        });
        this.valueChangeSelect({...this.retailerSelected , ...{"checked" : false}})
      }
      
      }
      
    })
  }
  
  valueChangeSelect(event:any){
    this.retailerSelected = event
    this.brandChange.emit(event)
  }
  apply(id){

    this.filterApply.emit({"key" : "Brands"})
    this.closeModal.emit(id)
    this.searchText = ""
  }

}
