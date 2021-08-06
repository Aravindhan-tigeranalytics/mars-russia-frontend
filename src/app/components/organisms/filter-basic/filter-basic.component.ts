import { Component } from '@angular/core';
import { SimulatorService } from '@core/services/simulator.service';

@Component({
    selector: 'nwn-filter-basic',
    templateUrl: './filter-basic.component.html',
    styleUrls: ['./filter-basic.component.css'],
})
export class FilterBasicComponent {
    filterNames:any = [{ type : 'stroke', nwnSvgIcon: 'retailers', hideTick: true, id : 'filter-retailer', name: 'Filter by retailer' },
    { type : 'stroke', nwnSvgIcon: 'categories', hideTick: true, id : 'filter-categories', name: 'Filter by category' },
    { type : 'stroke', nwnSvgIcon: 'strategic-cells', hideTick: true, id : 'filter-stragetic-cells', name: 'Filter by strategic cell' },
    { type : 'stroke', nwnSvgIcon: 'brands', hideTick: true, id : 'filter-brands', name: 'Filter by brand' },
    { type : 'stroke', nwnSvgIcon: 'brand-formats', hideTick: true, id : 'filter-brand-formats', name: 'Filter by brand format' },
    { type : 'stroke', nwnSvgIcon: 'product-groups', hideTick: true, id : 'filter-product-groups', name: 'Filter by product group' }]
    placeholder:string = 'Search filter name'
    searchText = ''
    constructor(public simulatorService: SimulatorService){

    }
    inputChangeEvent($event){
        this.searchText = $event
    }
    openFilterModal(id:string){
        let temp:any = {}
        temp.close = 'filter-basic'
        temp.open = id
        this.simulatorService.setCommandInterfaceModalObservable(temp)
    }
}
