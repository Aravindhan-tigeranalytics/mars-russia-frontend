import { Component, OnInit , Output,EventEmitter } from '@angular/core';
import { ControlValueAccessor,NG_VALUE_ACCESSOR, } from '@angular/forms'

@Component({
  selector: 'nwn-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: CompetitionComponent
    }
  ]
})
export class CompetitionComponent implements ControlValueAccessor{

  // @Output() toggleEvent = new EventEmitter();
  follow_competition : boolean = false

  constructor() { }

  onChange = (quantity) => {};

  onTouched = () => {};
  writeValue(follow_competition: boolean) {
    this.follow_competition = follow_competition;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }



  
  toggle($event){
    // this.toggleEvent.emit($event)
    this.onChange($event.checked)
    console.log($event , "toggle event...")
  }

}
