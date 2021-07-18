/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';

import { ModalService } from '@molecules/modal/modal.service';

@Component({
    selector: 'nwn-promo-scenario-builder',
    templateUrl: './promo-scenario-builder.component.html',
    styleUrls: ['./promo-scenario-builder.component.css'],
})
export class PromoScenarioBuilderComponent implements OnInit {
    constructor(private modalService: ModalService) {}

    ngOnInit() {}

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    receiveMessage($event: any) {
        console.log('recieved');
        this.openModal($event);
    }
}
