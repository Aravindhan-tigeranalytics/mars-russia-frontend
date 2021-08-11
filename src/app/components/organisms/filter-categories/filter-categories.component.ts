import { Component, OnInit,Input,EventEmitter, Output  } from '@angular/core';
import { SimulatorService } from '@core/services/simulator.service';
import {CheckboxModel} from "../../../core/models"
import {ModalApply} from "../../../shared/modal-apply.component"

@Component({
  selector: 'nwn-filter-categories',
  templateUrl: './filter-categories.component.html',
  styleUrls: ['./filter-categories.component.css']
})
export class FilterCategoriesComponent extends ModalApply  implements OnInit {

  @Input()
  categories:Array<CheckboxModel> = []

  // @Output()
  // categoryChange = new EventEmitter()
  	
  placeholder:any = 'Search categories'
  constructor(public restApi: SimulatorService) { 
    super()
  }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      console.log(data,"from modal apply")
      this.searchText = ""
    })
  }
  // valueChangeSelect(event:any){
  //   this.categoryChange.emit(event)
  // }

}
