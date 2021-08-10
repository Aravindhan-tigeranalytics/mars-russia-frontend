import { Component,OnInit,Output , EventEmitter } from '@angular/core';
import {OptimizerService, SimulatorService} from '@core/services'
import { ListPromotion} from "@core/models"
import { ModalService } from '@molecules/modal/modal.service';

@Component({
    selector: 'nwn-load-scenario-promosimulator',
    templateUrl: './load-scenario-promosimulator.component.html',
    styleUrls: ['./load-scenario-promosimulator.component.css'],
})
export class LoadScenarioPromosimulatorComponent implements OnInit {
    selectedIndex!: number;
    openTab = 2;
    selected_promotion:any = null;
    promotion_viewed:ListPromotion = null as any
    searchText = ''
    @Output()
    loadPromotionEvent = new EventEmitter()

    list_promotion:Array<ListPromotion> = []
    list_promotion_promo:Array<ListPromotion> = []
    list_promotion_optimizer:Array<ListPromotion> = []
    list_promotion_pricing:Array<ListPromotion> = []

    constructor(private optimize : OptimizerService,private modal : ModalService,public restApi: SimulatorService){

    }
    ngOnInit(): void {
        this.restApi.ClearScearchText.asObservable().subscribe(data=>{
            console.log(data,"from modal apply")
            this.searchText = ""
          })
        this.optimize.getListObservation().subscribe(data=>{
            if(data){
                console.log(data , "get list promotions")
                this.list_promotion = data
            this.list_promotion_promo = this.list_promotion.filter(data=>data.scenario_type == "promo")
            this.list_promotion_optimizer = this.list_promotion.filter(data=>data.scenario_type == "optimizer")
            this.list_promotion_pricing = this.list_promotion.filter(data=>data.scenario_type == "pricing")


            }
                    })

    }
    confirmationDelete($event){
        console.log(this.promotion_viewed , "protoion detaile to delete")
        console.log(this.promotion_viewed.id , "id to delete")
        console.log($event , "confimatin delete at load scenario")
        this.modal.close("delete-scenario")
        if($event == 'yes'){
            this.optimize.deletePromoScenario(this.promotion_viewed.id).subscribe(data=>{
                this.optimize.deleteListPromotion(this.promotion_viewed.id)
                this.modal.close("promo-simulator-popup")
            },err=>{
                console.log(err , "error")
            })

        }
    }
    modalConfirmation($event){
        if($event == 'back'){
            this.modal.close('promo-simulator-popup')
        }
        else if($event == 'load'){
            this.modal.close('promo-simulator-popup')
            this.loadScenario()
        }
    }
    deleteClickedEvent($event){


        this.modal.open("delete-scenario")
        // console.log($event , "delete event")
       

    }
    infoClickedEvent($event){
        this.promotion_viewed = $event
        console.log($event , "id of promotion ")
        this.modal.open("promo-simulator-popup")
    }
    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;
    }
    inputChangeEvent($event){
        this.searchText = $event
    }
    select(index: number,promotion:any) {
        this.selectedIndex = index;
        this.selected_promotion = promotion
        console.log(promotion , "selected promotion...")
    }
    loadScenario(){
        this.loadPromotionEvent.emit(this.selected_promotion)
        this.modal.close('load-scenario-promosimulator')

        // load-scenario-promosimulator
   
    }  

   

    
}
