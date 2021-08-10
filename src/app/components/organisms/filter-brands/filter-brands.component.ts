import { Component, OnInit,Input,EventEmitter, Output  } from '@angular/core';
import { SimulatorService } from '@core/services/simulator.service';
import {ModalApply} from "../../../shared/modal-apply.component"

@Component({
  selector: 'nwn-filter-brands',
  templateUrl: './filter-brands.component.html',
  styleUrls: ['./filter-brands.component.css']
})
export class FilterBrandsComponent extends ModalApply implements OnInit {

  @Input()
  brands:Array<string> = []

  @Output()
  brandChange = new EventEmitter()

  placeholder:any = 'Search brands'
  constructor(public restApi: SimulatorService) {
    super()
   }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      console.log(data,"from modal apply")
      this.searchText = ""
    })
  }
  
  valueChangeSelect(event:any){
    this.brandChange.emit(event)
  }

}
