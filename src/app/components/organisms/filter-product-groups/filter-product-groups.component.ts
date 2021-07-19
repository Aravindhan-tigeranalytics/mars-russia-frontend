import { Component, OnInit,Input,EventEmitter, Output } from '@angular/core';
import { CheckboxModel } from 'src/app/core/models';

@Component({
  selector: 'nwn-filter-product-groups',
  templateUrl: './filter-product-groups.component.html',
  styleUrls: ['./filter-product-groups.component.css']
})
export class FilterProductGroupsComponent implements OnInit {

  @Input()
  product_groups:Array<CheckboxModel> = []

  @Output()
  productChange = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  valueChangeSelect(event:any){
    this.productChange.emit(event)
  }

}
