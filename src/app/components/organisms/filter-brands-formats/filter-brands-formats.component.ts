import { Component, OnInit,Input,EventEmitter, Output  } from '@angular/core';
import {ModalApply} from "../../../shared/modal-apply.component"

@Component({
  selector: 'nwn-filter-brands-formats',
  templateUrl: './filter-brands-formats.component.html',
  styleUrls: ['./filter-brands-formats.component.css']
})
export class FilterBrandsFormatsComponent extends ModalApply  implements OnInit {
  @Input()
  brand_formats:Array<string> = []

  @Output()
  brandFormatChange = new EventEmitter()

  placeholder:any = 'Search brand formats'

  constructor() { 
    super()
  }

  ngOnInit(): void {
  }
  valueChangeSelect(event:any){
    this.brandFormatChange.emit(event)
  }

}
