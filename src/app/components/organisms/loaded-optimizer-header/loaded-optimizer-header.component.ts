import { Component, Output, EventEmitter, ViewChild, OnInit,Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {takeUntil} from "rxjs/operators"
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {OptimizerService} from "@core/services"
import {OptimizerModel , ProductWeek , OptimizerConfigModel, FilterModel, ListPromotion} from "@core/models"
import * as Utils from "@core/utils"
// import { Component, Output, EventEmitter, ViewChild, OnInit,Input } from '@angular/core';
// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
// import {OptimizerService} from '../../../core/services/optimizer.service'
@Component({
    selector: 'nwn-loaded-optimizer-header',
    templateUrl: './loaded-optimizer-header.component.html',
    styleUrls: ['./loaded-optimizer-header.component.css'],
})
export class LoadedOptimizerHeaderComponent implements OnInit {
    private unsubscribe$: Subject<any> = new Subject<any>();
    optimizer_data : OptimizerModel = null as any
    quarter_year:any[] = []
    promotions : any[] = []
    selected_objective:string = ''
    duration_min = 0
    duration_max = 0
    param_gap_min = 0
    param_gap_max = 0
    min_week= 0
    max_week = 0
    selected_promotions = []

    product_week : ProductWeek[] = []
    @Input()
    title: string = 'Untitled';
    @Input()
    status: 'string' | 'yettobesimulated' | 'viewmore' | 'viewless' = 'yettobesimulated';
    @Output()
    modalEvent = new EventEmitter<string>();
    @Output()
    modalClose = new EventEmitter()
    cumpulsory_week = 0
    cumpulsory_week_val:any[] = []
    ignored_week_val:any[] = []
    ignored_week = 0
    @Output()
    optimizeAndResetEvent = new EventEmitter()
    @Input()
    disable_button = true
    @Output()
    downloadEvent = new EventEmitter<any>();
    @Input()
    filter_model : FilterModel
    info_promotion : ListPromotion = null as any

    optimizerMetrics:any = ''
    constructor(public optimize:OptimizerService){}
    ngOnInit() {
        this.optimize.getoptimizerDataObservable().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(data=>{
            if(data){
                console.log(data , "data of optimizer loaded")
                this.disable_button = false
                this.isExpand = false
                this.optimizer_data = data
                this.populatePromotion(this.optimizer_data.weekly)
                this.populateConfig(this.optimizer_data.data)
                if("meta" in data){
                    this.info_promotion = data["meta"]
                    this.title = data["meta"]["name"]
                }
            }
            else{
                this.disable_button = true
                this.isExpand = true
                this.optimizer_data  = data
                this.title = "Untitled"
                this.product_week = []

                this.quarter_year = []
    this.promotions = []
    this.selected_objective = ''
    this.duration_min = 0
    this.duration_max = 0
    this.param_gap_min = 0
    this.param_gap_max = 0
    this.min_week= 0
    this.max_week = 0
    this.selected_promotions = []
    this.info_promotion = null as any

            }
            
        })
        
    }
    download(){
        // if(this.disable_button){
        //     return
        // }
        this.downloadEvent.emit()

    }
  

    // constructor(private optimize : OptimizerService){

    // }

    openInfoEvent($event){
        this.sendMessage($event)
    }
    cumpulsoryWeekEvent($event){
        this.cumpulsory_week_val = $event["value"]
        // {
        //     "id" : "compulsory-weeks-popup",
        //     "value" : this.weekly_map
        // }
        this.cumpulsory_week = $event["value"].length
        this.modalClose.emit($event["id"])
    }
    ignoredWeekEvent($event){
        this.ignored_week_val =  $event["value"]
        this.ignored_week =  $event["value"].length
        this.modalClose.emit($event["id"])

    }
    promotionAddEvent($event){
        this.selected_promotions = $event["value"]
        this.modalClose.emit($event["id"])
    }

    durationWavesEvent($event){
        this.modalClose.emit("duration-of-waves")
        this.duration_min = $event["min_val"]
        this.duration_max = $event["max_val"]
        
    }
    paramGapEvent($event){
        this.modalClose.emit("minimum-gap-waves")
        this.param_gap_min = $event["min_val"]
        this.param_gap_max = $event["max_val"]
        console.log($event , "slider change event param gap")

    }
    promoWaveEvent($event){
        this.modalClose.emit("number-promo-waves")
        this.min_week = $event["min_val"]
        this.max_week = $event["max_val"]

    }
    promoEvent($event){

    }
    configChangeEvent($event){
        console.log($event , "config change event")
        this.modalClose.emit($event["id"])
       
        // label: "MAC", event:max_val: 0.4
// min_val: 0
this.checkboxMetrices.find(d=>{
    console.log($event["label"] , "label from config")
    console.log(d.checkboxLabel , "check box label availalbe")
    if(d.checkboxLabel==$event["label"]){

        d.checkHeadValue = "x" +  $event['event'] 
    }
    // if(d.id=="retailer-popup"){
    //     d.checkHeadValue = "x" +  $event['event']['max_val']
    // }
    // if(d.id=="te-popup"){
    //     d.checkHeadValue = "x" +  $event['event']['max_val']
    // }
    // if(d.id=="mac-per-popup"){
    //     d.checkHeadValue = "x" +  $event['event']['max_val']
    // }
    // if(d.id=="rp-per-popup"){
    //     d.checkHeadValue = "x" +  $event['event']['max_val']
    // }
})
         
    }
    toggle_disable(objective){
        if(this.selected_objective.includes("MAC")){
            this.checkboxMetrices.find(d=>{
                if(d.checkboxLabel == "MAC"){
                    d.disabled = true

                }
               
            })
            this.checkboxMetrices.filter(d=>{
                if(d.checkboxLabel!="MAC"){
                    d.disabled = false
                }
            })
        }
        else if(this.selected_objective.includes("RP")){
            this.checkboxMetrices.find(d=>{
                if(d.checkboxLabel == "Retailer profit"){
                    d.disabled = true

                }
               
            })
            this.checkboxMetrices.filter(d=>{
                if(d.checkboxLabel!="Retailer profit"){
                    d.disabled = false
                }
            })

        }
        else if(this.selected_objective.includes("TE")){
            this.checkboxMetrices.find(d=>{
                if(d.checkboxLabel == "Trade expense"){
                    d.disabled = true

                }
               
            })
            this.checkboxMetrices.filter(d=>{
                if(d.checkboxLabel!="Trade expense"){
                    d.disabled = false
                }
            })

        }

    }

    objectiveEvent($event){
        this.modalClose.emit("optimize-function")
        this.selected_objective = $event
        this.toggle_disable(this.selected_objective)
        
        console.log(this.selected_objective , "selected objective  selected")
        console.log(this.checkboxMetrices , "check box modified ")

    }
    optimizeReset(type){
        if(type=="optimize"){
            this.optimizeAndResetEvent.emit({
                "type" : 'optimize',
                'data' : this.optimizerData()
            })
            // this.isExpand = true
            // this.modalEvent.emit('Optimize');
            // if(modalType == 'Optimize'){
            //     this.isExpand = true
    
            // }
            // this.modalEvent.emit(modalType);
        }
        if(type == 'reset'){
            this.optimizeAndResetEvent.emit({
                "type" : 'reset',
            })

        }

    }
    get_order_map(id){
        let ret = ''
        if(id == 'mac-popup'){
            ret = 'MAC'
        }
        if(id == 'retailer-popup'){
            ret = 'RP'
        }
        if(id == 'te-popup'){
            ret = 'Trade_Expense'
        }
        if(id == 'mac-per-popup'){
            ret = 'MAC_Perc'
        }
        if(id == 'rp-per-popup'){
            ret = 'RP_Perc'
        }
        return ret
    }
    optimizerData(){
       let decoded =  this.selected_promotions.map(d=>Utils.decodePromotion(d))

       console.log(this.checkboxMetrices, "check box metrices")
    
       
      let mac:number =  parseFloat(this.checkboxMetrices.find(d=>d.id == "mac-popup")['checkHeadValue'].split("x")[1])
      let rp:number =  parseFloat(this.checkboxMetrices.find(d=>d.id == "retailer-popup")['checkHeadValue'].split("x")[1])
      let te:number =  parseFloat(this.checkboxMetrices.find(d=>d.id == "te-popup")['checkHeadValue'].split("x")[1])
      let mac_nsv:number =  parseFloat(this.checkboxMetrices.find(d=>d.id == "mac-per-popup")['checkHeadValue'].split("x")[1])
      let rp_rsv:number =  parseFloat(this.checkboxMetrices.find(d=>d.id == "rp-per-popup")['checkHeadValue'].split("x")[1])
    //   debugger
        // Utils.decodePromotion()
        // checkboxMetrices "Fin_Pref_Order":['Trade_Expense',"RP_Perc",'MAC_Perc','RP','MAC'],
        // checkHeadValue: 'x0.50',
        // checkboxLabel: 'MAC',
        return {
            "fin_pref_order" : this.checkboxMetrices.map(d=>this.get_order_map(d.id)),

           "objective_function" : this.selected_objective.replace("Maximize " , "").replace("Minimize " , ""),
    "param_max_consecutive_promo" : this.duration_max,
    "param_min_consecutive_promo" : this.duration_min,
    "param_promo_gap" : this.param_gap_max,
    "param_total_promo_min" : this.min_week,
    "param_total_promo_max":this.max_week,
   "mars_tpr": decoded.map(d=>d.promo_depth),
   "co_investment" : decoded.map(d=>d.co_investment),
   "promo_mech" : decoded.map(d=>d.promo_mechanics),
   "config_mac" : mac != 1,
   "param_mac" : mac,
   "config_rp" : rp != 1,
   "param_rp" : rp,
   "config_trade_expense" : te != 1,
   "param_trade_expense" : te,
   "config_mac_perc" : mac_nsv != 1,
   "param_mac_perc" : mac_nsv,
   "config_rp_perc" : rp_rsv != 1,
   "param_rp_perc" : rp_rsv , 
   "param_compulsory_no_promo_weeks" : this.ignored_week_val.map(d=>d.week),
   "param_compulsory_promo_weeks" : this.cumpulsory_week_val.map(d=>d.week)

        }
    }

    sendMessage(modalType: string): void {
        // this.isExpand = true
        if(modalType == 'Optimize'){
            this.isExpand = true

        }
        this.modalEvent.emit(modalType);
    }

    // sho and hide more action menu
    isShowDivIf = true;

    toggleDisplayDivIf() {
        this.isShowDivIf = !this.isShowDivIf;
    }

    // expand and collapse
    isExpand = true;
    expandHeader() {
        if(this.disable_button){
            return
        }
        this.isExpand = !this.isExpand;
    }
    populateConfig(configData :OptimizerConfigModel ){
        // configData.param_mac

        this.checkboxMetrices.filter(d=>{
            if(d.id == "mac-popup"){
                d.disabled = true
                d.checkHeadValue = "x" + configData.param_mac

            }
            if(d.id == "te-popup"){
            
                d.checkHeadValue = "x" + configData.param_trade_expense

            }
            if(d.id == "retailer-popup"){

                d.checkHeadValue = "x" + configData.param_rp

            }
            if(d.id == "mac-per-popup"){
                d.disabled = configData.config_mac_perc
                d.checkHeadValue = "x" + configData.param_mac_perc

            }
            if(d.id == "rp-per-popup"){
                d.disabled = configData.config_rp_perc
                d.checkHeadValue = "x" + configData.param_rp_perc

            }
             
        })
    }
    populatePromotion(weekdata : ProductWeek[]){
        this.promotions = []
        this.product_week = this.optimizer_data.weekly
        
                
                weekdata.forEach(data=>{
                    let gen_promo = Utils.genratePromotion(
                        parseFloat(data.flag_promotype_motivation) , 
                        parseFloat(data.flag_promotype_n_pls_1),
                        parseFloat(data.flag_promotype_traffic),
                        parseFloat(data.promo_depth) , 
                        parseFloat(data.co_investment)
                    )
                    data.promotion_name = gen_promo
                    if(gen_promo && !this.promotions.includes(gen_promo)){
                      
                        this.promotions.push(gen_promo)
                    }
                    let str = "Y" + 1 + " Q"+data.quater as string
                    if(!this.quarter_year.includes(str)){
                        this.quarter_year.push(str);
                    }
                    
                    data.promo_depth = parseInt(data.promo_depth)
                    data.co_investment = (data.co_investment)
    
                })

                console.log(this.promotions , "generated promotions for optimizer")

    }

   
    // ngOnInit() {
    //     this.optimize.optimizerMetricsData.asObservable().subscribe(data=>{
    //         console.log(data)
    //         if(data == null){
    //             this.optimizerMetrics = ''
    //         }
    //         else{
    //             this.optimizerMetrics = data
    //             this.expandHeader()
    //         }
    //     })
    // }

    // drag and drop
    checkboxMetrices:any = [
        {
            id:"mac-popup",
            checkHeadValue: 'x0.50',
            checkboxLabel: 'MAC',
            disabled: false,
        },
        {
            id:"retailer-popup",
            checkHeadValue: 'x0.75',
            checkboxLabel: 'Retailer profit',
            disabled: false,
        },
        {
            id:"te-popup",
            checkHeadValue: 'x1.50',
            checkboxLabel: 'Trade expense',
            disabled: false,
        },
        {
            id:"mac-per-popup",
            checkHeadValue: 'x1.25',
            checkboxLabel: 'MAC, % NSV',
            disabled: false,
        },
        {
            id:"rp-per-popup",
            checkHeadValue: 'x1.00',
            checkboxLabel: 'RP, % RSV',
            disabled: false,
        },
    ];

    drop(event: CdkDragDrop<string[]>) {
        console.log(event , "event dragging")
        moveItemInArray(this.checkboxMetrices, event.previousIndex, event.currentIndex);
        console.log(event.previousIndex, event.currentIndex , "prev and current")
        console.log(this.checkboxMetrices, event.currentIndex , "this.checkboxMetrices and current")
    }

    onRoleChangeCheckbox(ev, index) {
        this.checkboxMetrices[index].disabled = !ev;
        console.log(this.checkboxMetrices);
    }

    // select config
    singleSelect: any = [];
    config = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        search: false,
    };
    optionsNormal = [
        {
            _id: '3years',
            index: 0,
            balance: '$2,806.37',
            picture: 'http://placehold.it/32x32',
            name: '3 years',
        },
        {
            _id: '1year',
            index: 1,
            balance: '$2,984.98',
            picture: 'http://placehold.it/32x32',
            name: '1 years',
        },
        {
            _id: '2year',
            index: 1,
            balance: '$2,984.98',
            picture: 'http://placehold.it/32x32',
            name: '2 years',
        },
    ];

    options1 = [
        {
            _id: 'N230%(Co30%)',
            index: 0,
            name: 'N+2-30% (Co-30%)',
        },
        {
            _id: 'N230%(Co30%)s',
            index: 1,
            name: 'N+2-30% (Co-30%)',
        },
        {
            _id: 'N230%(Co30%)a',
            index: 1,
            name: 'N+2-30% (Co-30%)',
        },
    ];
    options2 = [
        {
            _id: 'N230%(Co30%)1',
            index: 0,
            name: 'N+2-30% (Co-30%)1',
        },
        {
            _id: 'N230%(Co30%)s2',
            index: 1,
            name: 'N+2-30% (Co-30%)2',
        },
        {
            _id: 'N230%(Co30%)a3',
            index: 1,
            name: 'N+2-30% (Co-30%)3',
        },
    ];
    options3 = [
        {
            _id: 'N230%(Co30%)2',
            index: 0,
            name: 'N+2-30% (Co-30%)2',
        },
        {
            _id: 'N230%(Co30%)s2',
            index: 1,
            name: 'N+2-30% (Co-30%)4',
        },
        {
            _id: 'N230%(Co30%)a3',
            index: 1,
            name: 'N+2-30% (Co-30%)3',
        },
    ];

    ngOnDestroy(){
        console.log("destroying optimizer header")
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
