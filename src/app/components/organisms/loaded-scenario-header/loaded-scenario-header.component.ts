import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {OptimizerService} from '../../../core/services/optimizer.service'
import {ProductWeek , Product, CheckboxModel} from "../../../core/models"
import { Observable, of, from, BehaviorSubject, combineLatest } from 'rxjs';

@Component({
    selector: 'nwn-loaded-scenario-header',
    templateUrl: './loaded-scenario-header.component.html',
    styleUrls: ['./loaded-scenario-header.component.css'],
})
export class LoadedScenarioHeaderComponent implements OnInit {
    @Input()
    title: string = 'Galaxy promo scenario';
    @Output()
    modalEvent = new EventEmitter<string>();
    options1:Array<string> = [];
    promotions$: Observable<string[]> = null as any;
    product_week:ProductWeek[] = [];
    genobj : {[key:string] : any[]  } = {}
    quarter_year:Array<string> = [];
    selected_quarter:string = ''
    selected_product_week : ProductWeek[] = []
    constructor(private optimize : OptimizerService,){

    }
    ngOnInit(){
       this.optimize.getPromotionObservable().subscribe(data=>{
           if (data.length > 0){
               this.options1 = data
               console.log(this.options1, "options 1")

           }
          
       })

        this.optimize.fetch_week_value(358).subscribe(data=>{
            let promo_depth : Array<number> = []
            console.log(data , "weekly data")
            this.product_week = data
            this.product_week.forEach(data=>{
            
                let val = (parseFloat((data.promo_depth).toString()))
                if(!promo_depth.includes(val)){
                    if(val){
                        promo_depth.push(val)
                    }

                }

                console.log(data , " DATA from product wweeke")
                // this.quarter_year.push('')
                let str = "Y" + 1 + " Q"+data.quater as string
                if(str in this.genobj){
                    this.genobj[str].push(data)
                    // append(data)
                }
                else{
                    this.quarter_year.unshift(str);
                    this.genobj[str] = [data]
                }

            })
            this.optimize.set_base_line_promotion(promo_depth)
            this.selected_quarter = this.quarter_year[0]
            this.selected_product_week  = this.product_week.filter(data=>data.quater == parseInt(
                this.selected_quarter.split("Q")[1]
                )
                ).sort((a,b)=>(a.week > b.week) ? 1 : ((b.week > a.week) ? -1 : 0))
            console.log(this.genobj , "gen obj")
           
          },error=>{
            console.log(error , "error")
          })
    }
    changeQuarter(key:string){
        
        // debugger
        this.selected_quarter = key
        this.selected_product_week  = this.product_week.filter(data=>data.quater == parseInt(
            this.selected_quarter.split("Q")[1]
            )
            ).sort((a,b)=>(a.week > b.week) ? 1 : ((b.week > a.week) ? -1 : 0))
    }


    sendMessage(modalType: string): void {
        this.modalEvent.emit(modalType);
    }

    isShowDivIf = true;

    toggleDisplayDivIf() {
        this.isShowDivIf = !this.isShowDivIf;
    }

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
    


    // options1 = [
    //     {
    //         _id: 'N230%(Co30%)',
    //         index: 0,
    //         name: 'N+2-30% (Co-30%)',
    //     },
    //     {
    //         _id: 'N230%(Co30%)s',
    //         index: 1,
    //         name: 'N+2-30% (Co-30%)',
    //     },
    //     {
    //         _id: 'N230%(Co30%)a',
    //         index: 1,
    //         name: 'N+2-30% (Co-30%)',
    //     },
    // ];
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
}
