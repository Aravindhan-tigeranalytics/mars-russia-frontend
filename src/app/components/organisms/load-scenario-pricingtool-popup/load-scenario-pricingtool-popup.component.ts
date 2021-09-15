import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nwn-load-scenario-pricingtool-popup',
    templateUrl: './load-scenario-pricingtool-popup.component.html',
    styleUrls: ['./load-scenario-pricingtool-popup.component.css'],
})
export class LoadScenarioPricingtoolPopupComponent implements OnInit {
    selectedIndex!: number;
    constructor() {}

    ngOnInit() {}

    loadPricingSimulatorItems: any[] = [
        {
            slcHead: 'Pricing scenario name',
            slcContent:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi enim ultrices eget donec in nunc, mi nisl elit. Nibh proin vitae faucibus tempor mauris, justo. Turpis adipiscing egestas.',
        },
        {
            slcHead: 'Pricing scenario name',
            slcContent:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi enim ultrices eget donec in nunc, mi nisl elit. Nibh proin vitae faucibus tempor mauris, justo. Turpis adipiscing egestas.',
        },
    ];

    select(index: number) {
        this.selectedIndex = index;
    }
}
