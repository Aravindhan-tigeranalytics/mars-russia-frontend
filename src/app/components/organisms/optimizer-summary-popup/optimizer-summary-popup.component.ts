import { Component, EventEmitter, Input, OnInit,Output,SimpleChanges } from '@angular/core';
import { ProductWeek } from '@core/models';
import { ModalService } from '@molecules/modal/modal.service';

@Component({
    selector: 'nwn-optimizer-summary-popup',
    templateUrl: './optimizer-summary-popup.component.html',
    styleUrls: ['./optimizer-summary-popup.component.css'],
})
export class OptimizerSummaryPopupComponent implements OnInit {
    summaryInfoData:any =  [
    {"converted_base": '1.05',"converted_simulated": '2.3'},
    {"converted_base": '1.0',"converted_simulated": '2.3'},
    {"converted_base": '1.0',"converted_simulated": '2.3'},
    {"converted_base": '1.0',"converted_simulated": '2.3'},
    {"converted_base": '1.1',"converted_simulated": '2.3'}
    ]
    constructor(public modalService: ModalService){}
    ngOnInit(){
    
    }

    closeModal(){
        this.modalService.close('optimizer-summary-popup')
    }

}
