import { Component, OnInit } from '@angular/core';

import { ModalService } from '@molecules/modal/modal.service';

import {OptimizerService} from '../../core/services/optimizer.service'	

@Component({
    selector: 'nwn-promo-scenario-builder',
    templateUrl: './promo-scenario-builder.component.html',
    styleUrls: ['./promo-scenario-builder.component.css'],
})
export class PromoScenarioBuilderComponent implements OnInit {
    constructor(private modalService: ModalService,private optimize : OptimizerService) {}

    ngOnInit() {
        this.optimize.fertchVal()
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }
}
