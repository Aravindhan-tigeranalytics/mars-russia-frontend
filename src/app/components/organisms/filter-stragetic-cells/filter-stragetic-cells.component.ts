import { Component, OnInit, Input ,EventEmitter, Output} from '@angular/core';
import {ModalApply} from "../../../shared/modal-apply.component"
@Component({
  selector: 'nwn-filter-stragetic-cells',
  templateUrl: './filter-stragetic-cells.component.html',
  styleUrls: ['./filter-stragetic-cells.component.css']
})
export class FilterStrageticCellsComponent extends ModalApply implements OnInit {
  @Input()
  stragetic_cells:Array<string> = []
  @Output()
  strategicCellChange = new EventEmitter()

  placeholder:any = 'Search strategic cells'
  constructor() { 
    super()
  }

  ngOnInit(): void {
  }
  valueChangeSelect(event:any){
    this.strategicCellChange.emit(event)
  }

}
