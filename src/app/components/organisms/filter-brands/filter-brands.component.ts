import { Component, OnInit,Input,EventEmitter, Output  } from '@angular/core';
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

  constructor() {
    super()
   }

  ngOnInit(): void {
  }
  valueChangeSelect(event:any){
    this.brandChange.emit(event)
  }

}
