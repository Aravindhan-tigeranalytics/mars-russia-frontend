import { Component, OnInit,Input,EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'nwn-filter-brands-formats',
  templateUrl: './filter-brands-formats.component.html',
  styleUrls: ['./filter-brands-formats.component.css']
})
export class FilterBrandsFormatsComponent implements OnInit {
  @Input()
  brand_formats:Array<string> = []

  @Output()
  brandFormatChange = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  valueChangeSelect(event:any){
    this.brandFormatChange.emit(event)
  }

}
