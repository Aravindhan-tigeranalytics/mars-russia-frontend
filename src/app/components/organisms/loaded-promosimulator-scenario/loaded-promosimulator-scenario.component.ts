import { Component, OnInit , Input , Output , EventEmitter } from '@angular/core';
import {ListPromotion} from "@core/models"
import { ModalService } from '@molecules/modal/modal.service';

@Component({
  selector: 'nwn-loaded-promosimulator-scenario',
  templateUrl: './loaded-promosimulator-scenario.component.html',
  styleUrls: ['./loaded-promosimulator-scenario.component.css']
})
export class LoadedPromosimulatorScenarioComponent {

  @Input()
  promotion_viewed : ListPromotion = null as any
  @Output()
  deleteClicked =  new EventEmitter()

  constructor(private modalService: ModalService){}
  deleteClickedEvent($event){
      this.deleteClicked.emit(this.promotion_viewed)

      // console.log(this.promotion_viewed , "delete event")
  }
  closeModalPopup(){
    this.modalService.close('loaded-promosimulator-scenario')
  }

}
