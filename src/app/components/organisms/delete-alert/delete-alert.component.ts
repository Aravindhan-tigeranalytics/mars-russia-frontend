import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nwn-delete-alert',
    templateUrl: './delete-alert.component.html',
    styleUrls: ['./delete-alert.component.css'],
})
export class DeleteAlertComponent implements OnInit {
    selectedIndex!: number;
    constructor() {}

    ngOnInit() {}

    loadPromoSimulatorItems: any[] = [
        {
            slcHead: 'Promo scenario name',
            slcContent:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi enim ultrices eget donec in nunc, mi nisl elit. Nibh proin vitae faucibus tempor mauris, justo. Turpis adipiscing egestas.',
        },
        {
            slcHead: 'Promo scenario name',
            slcContent:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi enim ultrices eget donec in nunc, mi nisl elit. Nibh proin vitae faucibus tempor mauris, justo. Turpis adipiscing egestas.',
        },
    ];

    select(index: number) {
        this.selectedIndex = index;
    }
}
