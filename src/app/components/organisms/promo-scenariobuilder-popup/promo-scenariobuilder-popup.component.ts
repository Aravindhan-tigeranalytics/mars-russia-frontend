import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SimulatorService } from '@core/services/simulator.service';

@Component({
  selector: 'nwn-promo-scenariobuilder-popup',
  templateUrl: './promo-scenariobuilder-popup.component.html',
  styleUrls: ['./promo-scenariobuilder-popup.component.css']
})
export class PromoScenariobuilderPopupComponent implements OnInit {
  isFiltered: boolean = false
  placeholder: string = 'Search Filter'
  searchText = ''
  filterNames:any = [
  { type : 'stroke', nwnSvgIcon: 'filter', hideTick: true, id : 'filter-basic', name: 'Set filter' },
  { type : 'stroke', nwnSvgIcon: 'plus', hideTick: true, id : 'add-promotion', name: 'Add new promotion' },
  { type : 'stroke', nwnSvgIcon: 'variables', hideTick: true, id : 'promo-elasticity-modal', name: 'Set promo elasticity' },
  { type : 'stroke', nwnSvgIcon: 'plus', hideTick: true, id : 'load-scenario-promosimulator', name: 'Load scenario' },
]
  constructor(public simulatorService: SimulatorService) { }

  ngOnInit(): void {
  this.simulatorService.isAccAndProductFiltered.asObservable().subscribe(data=>{
    if(data){
      this.isFiltered = true
    }
  })
  }

  openModal(id:string){
    let temp:any = {}
    temp.close = 'promo-scenariobuilder-popup'
    temp.open = id
    this.simulatorService.setCommandInterfaceModalObservable(temp)
  }

  inputChangeEvent($event){
    this.searchText = $event
  }

}
