import { Component, EventEmitter, Input, OnInit,Output,SimpleChanges } from '@angular/core';
import { ProductWeek } from '@core/models';
import { ModalService } from '@molecules/modal/modal.service';

@Component({
    selector: 'nwn-user-guide-popup',
    templateUrl: './user-guide-popup.component.html',
    styleUrls: ['./user-guide-popup.component.css'],
})
export class UserGuidePopupComponent implements OnInit {
  
    constructor(public modalService: ModalService){}
    ngOnInit(){
    
    }

    closeModal(){
        this.modalService.close('user-guide-popup')
    }

}
