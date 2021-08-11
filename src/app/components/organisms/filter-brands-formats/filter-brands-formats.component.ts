import { Component, OnInit,Input,EventEmitter, Output  } from '@angular/core';
import { SimulatorService } from '@core/services/simulator.service';
import {ModalApply} from "../../../shared/modal-apply.component"

@Component({
  selector: 'nwn-filter-brands-formats',
  templateUrl: './filter-brands-formats.component.html',
  styleUrls: ['./filter-brands-formats.component.css']
})
export class FilterBrandsFormatsComponent extends ModalApply  implements OnInit {
  @Input()
  brand_formats:Array<string> = []

  // @Output()
  // brandFormatChange = new EventEmitter()

  placeholder:any = 'Search brand formats'

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
  //   this.brandFormatChange.emit(event)
  // }

}
