import { Component, OnInit } from '@angular/core';

import { ModalService } from '@molecules/modal/modal.service';

@Component({
    selector: 'nwn-promo-optimizer',
    templateUrl: './promo-optimizer.component.html',
    styleUrls: ['./promo-optimizer.component.css'],
})
export class PromoOptimizerComponent implements OnInit {
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
