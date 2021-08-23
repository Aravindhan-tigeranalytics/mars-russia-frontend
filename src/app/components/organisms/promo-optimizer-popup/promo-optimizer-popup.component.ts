import { Component,OnInit } from '@angular/core';
import { OptimizerService } from '@core/services';
import { ModalService } from '@molecules/modal/modal.service';

@Component({
    selector: 'nwn-promo-optimizer-popup',
    templateUrl: './promo-optimizer-popup.component.html',
    styleUrls: ['./promo-optimizer-popup.component.css'],
})
export class PromoOptimizerPopupComponent implements OnInit{
    constructor(public optimizerService: OptimizerService,public modalService: ModalService) {
    }

    ngOnInit(): void {
    }

    openModal(id:string){
        this.modalService.close('promo-optimizer-popup')
        this.modalService.open(id)
      }
}
