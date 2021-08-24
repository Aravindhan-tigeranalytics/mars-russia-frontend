import { Component, OnInit,Input,EventEmitter, Output  } from '@angular/core';
import { SimulatorService } from '@core/services/simulator.service';
import {CheckboxModel, FilterModel} from "../../../core/models"
import {ModalApply} from "../../../shared/modal-apply.component"

@Component({
  selector: 'nwn-filter-categories',
  templateUrl: './filter-categories.component.html',
  styleUrls: ['./filter-categories.component.css']
})
export class FilterCategoriesComponent extends ModalApply  implements OnInit {

  @Input()
  categories:Array<CheckboxModel> = []
  @Input()
  filter_model : FilterModel

  @Output()
  categoryChange = new EventEmitter()
  	
  placeholder:any = 'Search categories'
  constructor(public restApi: SimulatorService) { 
    super()
  }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      if(data == "filter-categories"){
        console.log(data,"from modal apply")
      this.searchText = ""
      if(this.filter_model.category == "Category"){

        this.categories.forEach(element => {
          element.checked = false
          
        });
        this.valueChangeSelect({...this.retailerSelected , ...{"checked" : false}})
      }
      }
      
    })
  }
  valueChangeSelect(event:any){
    this.retailerSelected = event
    this.categoryChange.emit(event)
  }
  apply(id){

    this.filterApply.emit({"key" : "Category"})
    this.closeModal.emit(id)
    this.searchText = ""
  }


}
