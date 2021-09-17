import { Component, OnInit , Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'nwn-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  @Output() toggleEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  toggle($event){
    this.toggleEvent.emit($event)
    console.log($event , "toggle event...")
  }

}
