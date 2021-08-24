import { Component, OnInit, Input ,EventEmitter, Output} from '@angular/core';
import { CheckboxModel, FilterModel } from '@core/models';
import { SimulatorService } from '@core/services/simulator.service';
import {ModalApply} from "../../../shared/modal-apply.component"
@Component({
  selector: 'nwn-filter-stragetic-cells',
  templateUrl: './filter-stragetic-cells.component.html',
  styleUrls: ['./filter-stragetic-cells.component.css']
})
export class FilterStrageticCellsComponent extends ModalApply implements OnInit {
  @Input()
  stragetic_cells:Array<CheckboxModel> = []
  @Output()
  strategicCellChange = new EventEmitter()
  @Input()
  filter_model : FilterModel

  placeholder:any = 'Search strategic cells'
  // retailerSelected:any = ''
  constructor(public restApi: SimulatorService) { 
    super()
  }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      if(data=="filter-stragetic-cells"){
        console.log(data,"from modal apply")
      this.searchText = ""
      if(this.filter_model.strategic_cell == "Strategic cells"){

        this.stragetic_cells.forEach(element => {
          element.checked = false
          
        });
        this.valueChangeSelect({...this.retailerSelected , ...{"checked" : false}})
      }
      }
      
    })
  }
  valueChangeSelect(event:any){
    this.retailerSelected = event
    this.strategicCellChange.emit(event)
   
  }
  apply(id){

    this.filterApply.emit({"key" : "Strategic cells"})
    this.closeModal.emit(id)
    this.searchText = ""
  }
  
 
}
