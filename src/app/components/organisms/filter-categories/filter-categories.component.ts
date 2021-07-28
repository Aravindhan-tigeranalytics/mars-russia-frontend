import { Component, OnInit,Input,EventEmitter, Output  } from '@angular/core';
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

  @Output()
  categoryChange = new EventEmitter()
  	
  placeholder:any = 'Search categories'
  constructor() { 
    super()
  }

  ngOnInit(): void {
  }
  valueChangeSelect(event:any){
    this.categoryChange.emit(event)
  }

}
