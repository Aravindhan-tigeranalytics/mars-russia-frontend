import { Component, OnInit,Input,EventEmitter, Output  } from '@angular/core';
import { CheckboxModel, FilterModel } from '@core/models';
import { SimulatorService } from '@core/services/simulator.service';
import {ModalApply} from "../../../shared/modal-apply.component"

@Component({
  selector: 'nwn-filter-brands-formats',
  templateUrl: './filter-brands-formats.component.html',
  styleUrls: ['./filter-brands-formats.component.css']
})
export class FilterBrandsFormatsComponent extends ModalApply  implements OnInit {
  @Input()
  brand_formats:Array<CheckboxModel> = []
  @Input()
  filter_model : FilterModel

  @Output()
  brandFormatChange = new EventEmitter()

  placeholder:any = 'Search brand formats'

  constructor(public restApi: SimulatorService) { 
    super()
  }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      if(data=="filter-brand-formats"){
        console.log(data,"from modal apply")
        this.searchText = ""
        if(this.filter_model.brand_format == "Brand Formats"){
  
          this.brand_formats.forEach(element => {
            element.checked = false
            
          });
          this.valueChangeSelect({...this.retailerSelected , ...{"checked" : false}})
        }

      }
     
    })
  }
  valueChangeSelect(event:any){
    this.retailerSelected = event
    this.brandFormatChange.emit(event)
  }
  apply(id){

    this.filterApply.emit({"key" : "Brand Formats"})
    this.closeModal.emit(id)
    this.searchText = ""
  }

}
