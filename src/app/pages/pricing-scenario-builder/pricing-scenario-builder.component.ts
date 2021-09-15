import { Component, OnInit } from '@angular/core';

import { ModalService } from '@molecules/modal/modal.service';

@Component({
    selector: 'nwn-pricing-scenario-builder',
    templateUrl: './pricing-scenario-builder.component.html',
    styleUrls: ['./pricing-scenario-builder.component.css'],
})
export class PricingScenarioBuilderComponent implements OnInit {
    constructor(private modalService: ModalService) {}

    ngOnInit(): void {}
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
