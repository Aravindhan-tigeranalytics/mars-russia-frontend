import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-simulated-filter-item',
    templateUrl: './simulated-filter-item.component.html',
    styleUrls: ['./simulated-filter-item.component.css'],
})
export class SimulatedFilterItemComponent {
    @Input()
    type: 'default' | 'active' | 'filled' | 'filled-active' = 'default';
    @Input()
    size: 'sfi' = 'sfi';
    @Input()
    showClose: boolean = false;
}
