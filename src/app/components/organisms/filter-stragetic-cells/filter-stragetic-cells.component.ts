import { Component, OnInit, Input ,EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'nwn-filter-stragetic-cells',
  templateUrl: './filter-stragetic-cells.component.html',
  styleUrls: ['./filter-stragetic-cells.component.css']
})
export class FilterStrageticCellsComponent implements OnInit {
  @Input()
  stragetic_cells:Array<string> = []
  @Output()
  strategicCellChange = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  valueChangeSelect(event:any){
    this.strategicCellChange.emit(event)
  }

}
