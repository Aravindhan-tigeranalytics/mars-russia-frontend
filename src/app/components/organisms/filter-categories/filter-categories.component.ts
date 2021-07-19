import { Component, OnInit,Input,EventEmitter, Output  } from '@angular/core';
import {CheckboxModel} from "../../../core/models"

@Component({
  selector: 'nwn-filter-categories',
  templateUrl: './filter-categories.component.html',
  styleUrls: ['./filter-categories.component.css']
})
export class FilterCategoriesComponent implements OnInit {

  @Input()
  categories:Array<CheckboxModel> = []

  @Output()
  categoryChange = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  valueChangeSelect(event:any){
    this.categoryChange.emit(event)
  }

}
