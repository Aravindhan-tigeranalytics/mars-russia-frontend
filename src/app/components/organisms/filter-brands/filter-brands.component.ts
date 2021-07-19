import { Component, OnInit,Input,EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'nwn-filter-brands',
  templateUrl: './filter-brands.component.html',
  styleUrls: ['./filter-brands.component.css']
})
export class FilterBrandsComponent implements OnInit {

  @Input()
  brands:Array<string> = []

  @Output()
  brandChange = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  valueChangeSelect(event:any){
    this.brandChange.emit(event)
  }

}
