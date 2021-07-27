import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {OptimizerService} from '../../../core/services/optimizer.service'
import {ProductWeek , Product, CheckboxModel,LoadedScenarioModel} from "../../../core/models"
import { Observable, of, from, BehaviorSubject, combineLatest } from 'rxjs';
import { ThemeService } from 'ng2-charts';

@Component({
    selector: 'nwn-loaded-scenario-header',
    templateUrl: './loaded-scenario-header.component.html',
    styleUrls: ['./loaded-scenario-header.component.css'],
})
export class LoadedScenarioHeaderComponent implements OnInit {
    @Input()
    title: string = '';
    @Output()
    modalEvent = new EventEmitter<string>();
    @Output()
    downloadEvent = new EventEmitter<any>();
    @Output()
    simulateResetEvent = new EventEmitter<{"action" : string,"promotion_map" : Array<any>}>();
    options1:Array<any> = [];
    promotions$: Observable<string[]> = null as any;
    product_week:ProductWeek[] = [];
    genobj : {[key:string] : any[]  } = {}
    quarter_year:Array<string> = [];
    selected_quarter:string = ''
    selected_product_week : ProductWeek[] = []
    promotion_map:Array<any> = [] //{"selected_promotion" : $event.value , "week" : this.product_week }
    available_year:any[] = ["year 1" , "year 2" , "year 3"]
    loaded_scenario:LoadedScenarioModel = null as any
    constructor(private optimize : OptimizerService,){

    }
    ngOnInit(){
        this.optimize.getLoadedScenarioModel().subscribe(data=>{
            console.log(data ,"get loaded model")
            if(data){
                this.populatePromotionWeek(data)

            }
           
            
        })
       this.optimize.getPromotionObservable().subscribe(data=>{
           if (data.length > 0){
               console.log(data , "get promotion data")
               this.options1 = data
               console.log(this.options1, "options 1")

           }
          
       })

        this.optimize.getProductWeekObservable().subscribe(data=>{
            if(data.length == 0){
                this.product_week = []
                this.optimize.set_base_line_promotion([])
                this.available_year =["year 1" , "year 2" , "year 3"]
                this.quarter_year = []
                this.selected_quarter = ''
                this.selected_product_week  = []
                this.optimize.setPromotionObservable([])

            }
            else{
                let promo_depth : Array<number> = []
                this.product_week = data
                this.product_week.forEach(data=>{
                    // if(!this.available_year.includes(data.year)){
                    //     this.available_year.push(data.year)
    
                    // }
                    
                // debugger
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
                    data.promo_depth = val
                    data.co_investment = (parseFloat((data.co_investment).toString()))
    
                })
                console.log(this.available_year , "Available year")
                this.options1 = promo_depth.map(val=>"TPR-"+val+"%")
                this.optimize.set_base_line_promotion(promo_depth)
                this.selected_quarter = this.quarter_year[0]
                this.selected_product_week  = this.product_week.filter(data=>data.quater == parseInt(
                    this.selected_quarter.split("Q")[1]
                    )
                    ).sort((a,b)=>(a.week > b.week) ? 1 : ((b.week > a.week) ? -1 : 0))
                console.log(this.genobj , "gen obj")
               
              }

            },
            
           error=>{
            console.log(error , "error")
          })
    }
    populatePromotionWeek(scenario : LoadedScenarioModel){
        let pw:ProductWeek[]=[];
        this.title = scenario.scenario_name
        scenario.base.weekly.forEach((data,index)=>{
            let simulated_depth = scenario.simulated.weekly[index].promo_depth
            console.log(simulated_depth , "simulated depth")
            if(simulated_depth){
                //{"selected_promotion" : $event.value , "week" : this.product_week }
                this.promotion_map.push({
                    "selected_promotion" : "TPR-"+simulated_depth+"%" ,
                     "week" : data
                })
            }
           pw.push({
            "model_meta": 0,
            "year": parseInt(data.year),
            "quater": data.quater,
            "month": data.month,
            "period": data.period,
            "week": data.week,
            "date": data.date,
            "promo_depth": data.promo_depth,
            "co_investment": data.co_investment,
            "flag_promotype_motivation": data.flag_promotype_motivation,
            "flag_promotype_n_pls_1": data.flag_promotype_n_pls_1,
            "flag_promotype_traffic": data.flag_promotype_traffic
           })

        })
        console.log(this.promotion_map , "final promotion map")
        this.optimize.setProductWeekObservable(pw)

    }
    promotionChange($event:any){
        let promo =  this.promotion_map.find(p=>p.week.week == $event.week.week) 
        console.log(promo , "promo filtered")
        if(promo){
            promo['selected_promotion'] = $event['selected_promotion']

        }
        else{
            this.promotion_map.push($event)

        }
      
        console.log($event , "promotion change in header")
        console.log(this.promotion_map , "promotion map")
    }
    copyBaseline(){
        this.promotion_map = []
        // {"selected_promotion" : $event.value , "week" : this.product_week }
        this.product_week.forEach(data=>{
            
            let val = (parseFloat((data.promo_depth).toString()))
            if(val){
                this.promotion_map.push({"selected_promotion":"TPR-"+val+"%","week" : data})
            
                // console.log(val , "values fro ", data.week , " discont " ,  "TPR-"+val+"%")
            }
            data.promo_depth = val
            // data.promo_depth = val
            data.co_investment = (parseFloat((data.co_investment).toString()))
            // promo_depth.map(val=>"TPR-"+val+"%")
        })
        console.log(this.promotion_map , "promotion map change")


        // debugger
    }
    changeQuarter(key:string){
        
        // debugger
        this.selected_quarter = key
        this.selected_product_week  = this.product_week.filter(data=>data.quater == parseInt(
            this.selected_quarter.split("Q")[1]
            )
            ).sort((a,b)=>(a.week > b.week) ? 1 : ((b.week > a.week) ? -1 : 0))
    }

    simulateAndReset(type){
        this.simulateResetEvent.emit({
            "action" : type,
            "promotion_map" : this.promotion_map
        })
    }

    sendMessage(modalType: string): void {
        this.modalEvent.emit(modalType);
    }
    download(){
        this.downloadEvent.emit()

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
