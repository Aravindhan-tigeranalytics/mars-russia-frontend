import { Component, OnInit,Input,EventEmitter, Output } from '@angular/core';
import { CheckboxModel } from 'src/app/core/models';
import {ModalApply} from "../../../shared/modal-apply.component"
@Component({
  selector: 'nwn-filter-product-groups',
  templateUrl: './filter-product-groups.component.html',
  styleUrls: ['./filter-product-groups.component.css']
})
export class FilterProductGroupsComponent extends ModalApply implements OnInit {

  @Input()
  product_groups:Array<CheckboxModel> = []

  @Output()
  productChange = new EventEmitter()

  placeholder:any = 'Search product groups'
  constructor() { 
    super()
  }

  ngOnInit(): void {
  }
  valueChangeSelect(event:any){
    this.productChange.emit(event)
  }

}
