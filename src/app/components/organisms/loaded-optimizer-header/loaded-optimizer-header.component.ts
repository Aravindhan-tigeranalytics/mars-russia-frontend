import { Component, Output, EventEmitter, ViewChild, OnInit,Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {takeUntil} from "rxjs/operators"
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {OptimizerService} from "@core/services"
import {OptimizerModel , ProductWeek , OptimizerConfigModel} from "@core/models"
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
    product_week : ProductWeek[] = []
    constructor(public optimize:OptimizerService){}
    ngOnInit() {
        this.optimize.getoptimizerDataObservable().pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(data=>{
            if(data){
                this.optimizer_data = data
                this.populatePromotion(this.optimizer_data.weekly)
                this.populateConfig(this.optimizer_data.data)

            }
            
        })
        
    }
    @Input()
    title: string = '';
    @Input()
    status: 'string' | 'yettobesimulated' | 'viewmore' | 'viewless' = 'yettobesimulated';
    @Output()
    modalEvent = new EventEmitter<string>();

    optimizerMetrics:any = ''

    // constructor(private optimize : OptimizerService){

    // }

    durationWavesEvent($event){
        this.duration_min = $event["min_val"]
        this.duration_max = $event["max_val"]
        console.log($event , "slider change event")
    }
    configChangeEvent($event){
        console.log($event , "event congfig change")
    }

    objectiveEvent($event){
        this.selected_objective = $event
        console.log(this.selected_objective , "selected objective  selected")

    }

    sendMessage(modalType: string): void {
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
        this.isExpand = !this.isExpand;
    }
    populateConfig(configData :OptimizerConfigModel ){
        // configData.param_mac

        this.checkboxMetrices.filter(d=>{
            if(d.id == "mac-popup"){
                d.disabled = configData.config_mac
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
    checkboxMetrices = [
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
        moveItemInArray(this.checkboxMetrices, event.previousIndex, event.currentIndex);
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
