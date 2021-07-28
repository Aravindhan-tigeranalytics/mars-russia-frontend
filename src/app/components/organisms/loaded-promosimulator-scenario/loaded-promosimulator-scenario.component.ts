import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'nwn-loaded-promosimulator-scenario',
  templateUrl: './loaded-promosimulator-scenario.component.html',
  styleUrls: ['./loaded-promosimulator-scenario.component.css']
})
export class LoadedPromosimulatorScenarioComponent implements OnInit {

  @Input()
  scenario_name:string = ''
  @Input()
  scenario_comment:string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
