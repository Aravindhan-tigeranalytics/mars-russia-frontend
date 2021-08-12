import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { OptimizerService } from '../../../core/services/optimizer.service';
import * as Utils from "../../../core/utils/util"
@Component({
    selector: 'nwn-promo-optimizer-aggregated',
    templateUrl: './promo-optimizer-aggregated.component.html',
    styleUrls: ['./promo-optimizer-aggregated.component.css'],
})


export class PromoOptimizerAggregatedComponent implements OnInit, AfterViewInit {
    translate_y: string = '';
    currentTranslateRate: string = '';
    constructor(private elRef: ElementRef,private restApi: OptimizerService) {}
    
    public weeklyTableWidth: any;
    public weeklyTableHeight: any;
    public aggregatedGraphWidth: any;

    public baseCalendar: any = []
    public stimulatedCalendar: any = []

    public baselineCalDropdown = "roi"
    public stimulatedCalDropdown = "roi"

    public baselineChartLegend = 'ROI'
    public stimulatedChartLegend = 'ROI'

    aggregatedTab:any = {
        "absolute": 'selected',
        "percent": 'unselected'
    }

    weeklyTab:any = {
        "absolute": 'selected',
        "percent": 'unselected'
    }
    activeWeeklyTab: string = 'absolute'
    activeAggregatedTab: string = 'absolute'

    units:any
    base_units:any
    incremental_units:any
    volume:any
    lsv:any
    nsv:any
    mac:any
    mac_per_nsv:any
    trade_expense:any
    customer_margin:any

    weeklyData:any = []
    optimizer_response : any = null

    ngOnInit(): void {
        this.weeklyTableWidth = window.innerWidth - 155;
        this.weeklyTableHeight = window.innerHeight - 150;
        this.aggregatedGraphWidth = (window.innerWidth - 155) / 2;
        this.restApi.getOptimizerResponseObservabe().subscribe(data=>{
            if(data){
                console.log(data , "response data")
                this.optimizer_response = data
                this.getChartData()

            }
            
        })
        // setTimeout(()=>{
            // 
            // },2000)
    }

    aggregatedSubTabClick(key : string){
        if(key == 'Absolute'){
            this.aggregatedTab = {
                "absolute": 'selected',
                "percent": 'unselected'
            }
            this.activeAggregatedTab = "absolute"
        }
        else {
            this.aggregatedTab = {
                "absolute": 'unselected',
                "percent": 'selected'
            }
            this.activeAggregatedTab = "percent"
        }
    }

    getChartData(){
        this.weeklyData = []
        this.baseCalendar = []
        this.stimulatedCalendar = []
        let optimizerResponse = this.optimizer_response.optimal
        let metrics: any = []
        for(let i=0; i < optimizerResponse.length; i++){
            let durationObj = this.convertToFormat(optimizerResponse[i].Date) 
            let week = optimizerResponse[i].week
            let holiday = false
            if(this.optimizer_response.holiday.length > 0){
                for(let j = 0; j < this.optimizer_response.holiday.length; j++){
                    if(optimizerResponse[i][this.optimizer_response.holiday[j]] == 1){
                        holiday = true
                    }
                }
            }
            let seasonality = ''
            if(optimizerResponse[i].SI){
                if(optimizerResponse[i].SI < 0.95){
                    seasonality = 'low'
                }
                else if(optimizerResponse[i].SI < 1.05){
                    seasonality = 'med'
                }
                else{
                    seasonality = 'high'
                }
            }
            this.baseCalendar.push({
                date: durationObj.date,
                timePeriod: durationObj.day + ' ' + durationObj.month,
                month: durationObj.month,
                year: durationObj.year,
                name: 'W'+ week + ' '+ durationObj.year,
                discount: optimizerResponse[i].Baseline_Promo/100,
                holiday: holiday,
                seasonality: seasonality,
                si : (optimizerResponse[i].SI).toFixed(2),
                roi: (optimizerResponse[i].Baseline_ROI).toFixed(2),
                lift : (optimizerResponse[i].Baseline_Lift).toFixed(2),
                holidayNames : this.optimizer_response.holiday
            })
            this.stimulatedCalendar.push({
                date: durationObj.date,
                timePeriod: durationObj.day + ' ' + durationObj.month,
                month: durationObj.month,
                year: durationObj.year,
                name: 'W'+ week + ' '+ durationObj.year,
                discount: optimizerResponse[i].Optimum_Promo/100,
                holiday: holiday,
                seasonality: seasonality,
                si : (optimizerResponse[i].SI).toFixed(2), 
                roi: (optimizerResponse[i].Optimum_ROI).toFixed(2),
                lift : (optimizerResponse[i].Optimum_Lift).toFixed(2) ,
                holidayNames : this.optimizer_response.holiday
            })
        }

        let financial_metrics:any = this.optimizer_response.financial_metrics
        this.units = {
            "converted_base": Utils.formatNumber(financial_metrics['base']['total']['units'],false,false),
            "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['units'],false,false),
            "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['units'],financial_metrics['base']['total']['units']) + "%)",
            "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['units']-financial_metrics['base']['total']['units'],false,false) + ")",
            "arrow": financial_metrics['simulated']['total']['units'] > financial_metrics['base']['total']['units'] ?  'carret-up' : 'carret-down' ,
            "color": this.colorForDifference(financial_metrics['base']['total']['units'] , financial_metrics['simulated']['total']['units']) 
        }

        this.base_units = {
            "converted_base": Utils.formatNumber(financial_metrics['base']['total']['base_units'],false,false),
            "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['base_units'],false,false),
            "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['base_units'],financial_metrics['base']['total']['base_units']) + "%)",
            "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['base_units']-financial_metrics['base']['total']['base_units'],false,false) + ")",
            "arrow": financial_metrics['simulated']['total']['base_units'] > financial_metrics['base']['total']['base_units'] ?  'carret-up' : 'carret-down' ,
            "color": this.colorForDifference(financial_metrics['base']['total']['base_units'] , financial_metrics['simulated']['total']['base_units'])
        }

        this.incremental_units = {
            "converted_base": Utils.formatNumber(financial_metrics['base']['total']['increment_units'],false,false),
            "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['increment_units'],false,false),
            "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['increment_units'],financial_metrics['base']['total']['increment_units']) + "%)",
            "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['increment_units']-financial_metrics['base']['total']['increment_units'],false,false) + ")",
            "arrow": financial_metrics['simulated']['total']['increment_units'] > financial_metrics['base']['total']['increment_units'] ?  'carret-up' : 'carret-down' ,
            "color": this.colorForDifference(financial_metrics['base']['total']['increment_units'] , financial_metrics['simulated']['total']['increment_units'])
        }

        this.volume = {
            "converted_base": Utils.formatNumber(financial_metrics['base']['total']['volume'],false,false),
            "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['volume'],false,false),
            "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['volume'],financial_metrics['base']['total']['volume']) + "%)",
            "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['volume']-financial_metrics['base']['total']['volume'],false,false) + ")",
            "arrow": financial_metrics['simulated']['total']['volume'] > financial_metrics['base']['total']['volume'] ?  'carret-up' : 'carret-down',
            "color": this.colorForDifference(financial_metrics['base']['total']['volume'] , financial_metrics['simulated']['total']['volume']) 
        }

        this.lsv = {
            "converted_base": Utils.formatNumber(financial_metrics['base']['total']['lsv'],false,false),
            "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['lsv'],false,false),
            "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['lsv'],financial_metrics['base']['total']['lsv']) + "%)",
            "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['lsv']-financial_metrics['base']['total']['lsv'],false,false) + ")",
            "arrow": financial_metrics['simulated']['total']['lsv'] > financial_metrics['base']['total']['lsv'] ?  'carret-up' : 'carret-down' ,
            "color": this.colorForDifference(financial_metrics['base']['total']['lsv'] , financial_metrics['simulated']['total']['lsv'])
        }

        this.nsv = {
            "converted_base": Utils.formatNumber(financial_metrics['base']['total']['nsv'],false,false),
            "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['nsv'],false,false),
            "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['nsv'],financial_metrics['base']['total']['nsv']) + "%)",
            "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['nsv']-financial_metrics['base']['total']['nsv'],false,false) + ")",
            "arrow": financial_metrics['simulated']['total']['nsv'] > financial_metrics['base']['total']['nsv'] ?  'carret-up' : 'carret-down',
            "color": this.colorForDifference(financial_metrics['base']['total']['nsv'] , financial_metrics['simulated']['total']['nsv']) 
        }

        this.mac = {
            "converted_base": Utils.formatNumber(financial_metrics['base']['total']['mac'],false,false),
            "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['mac'],false,false),
            "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['mac'],financial_metrics['base']['total']['mac']) + "%)",
            "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['mac']-financial_metrics['base']['total']['mac'],false,false) + ")",
            "arrow": financial_metrics['simulated']['total']['mac'] > financial_metrics['base']['total']['mac'] ?  'carret-up' : 'carret-down' ,
            "color": this.colorForDifference(financial_metrics['base']['total']['mac'] , financial_metrics['simulated']['total']['mac']) 
        }

        this.mac_per_nsv = {
            "converted_base": Utils.formatNumber(financial_metrics['base']['total']['mac_percent'],false,false),
            "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['mac_percent'],false,false),
            "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['mac_percent'],financial_metrics['base']['total']['mac_percent']) + "%)",
            "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['mac_percent']-financial_metrics['base']['total']['mac_percent'],false,false) + ")",
            "arrow": financial_metrics['simulated']['total']['mac_percent'] > financial_metrics['base']['total']['mac_percent'] ?  'carret-up' : 'carret-down' ,
            "color": this.colorForDifference(financial_metrics['base']['total']['mac_percent'] , financial_metrics['simulated']['total']['mac_percent'])
        }

        this.trade_expense = {
            "converted_base": Utils.formatNumber(financial_metrics['base']['total']['te'],false,false),
            "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['te'],false,false),
            "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['te'],financial_metrics['base']['total']['te']) + "%)",
            "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['te']-financial_metrics['base']['total']['te'],false,false) + ")",
            "arrow": financial_metrics['simulated']['total']['te'] > financial_metrics['base']['total']['te'] ?  'carret-up' : 'carret-down' ,
            "color": this.colorForDifference( financial_metrics['simulated']['total']['te'],financial_metrics['base']['total']['te'] )
        }

        this.customer_margin = {
            "converted_base": Utils.formatNumber(financial_metrics['base']['total']['rp'],false,false),
            "converted_simulated": Utils.formatNumber(financial_metrics['simulated']['total']['rp'],false,false),
            "percent": "(" + Utils.percentageDifference(financial_metrics['simulated']['total']['rp'],financial_metrics['base']['total']['rp']) + "%)",
            "converted_difference": "(" + Utils.formatNumber(financial_metrics['simulated']['total']['rp']-financial_metrics['base']['total']['rp'],false,false) + ")",
            "arrow": financial_metrics['simulated']['total']['rp'] > financial_metrics['base']['total']['rp'] ?  'carret-up' : 'carret-down' ,
            "color": this.colorForDifference(financial_metrics['base']['total']['rp'] , financial_metrics['simulated']['total']['rp'])
        }

        let data = financial_metrics;
        let weeks: number = data['base']['weekly'].length
        
            for(let i = 0; i < weeks; i++){
                let promotion_value = ''
                if(data['base']['weekly'][i]['flag_promotype_motivation'] == 1){
                    promotion_value = 'Motivation - '+data['base']['weekly'][i]['promo_depth']+'%';
                }
                else if(data['base']['weekly'][i]['flag_promotype_n_pls_1'] == 1){
                    promotion_value = 'N+1 - '+data['base']['weekly'][i]['promo_depth']+'%';
                }
                else if(data['base']['weekly'][i]['flag_promotype_traffic'] == 1){
                    promotion_value = 'Traffic - '+data['base']['weekly'][i]['promo_depth']+'%';
                }
                else{
                    promotion_value = 'TPR - '+data['base']['weekly'][i]['promo_depth']+'%';
                }

                let holiday: string = null as any
                if(this.optimizer_response.holiday.length > 0){
                    for(let j = 0; j < this.optimizer_response.holiday.length; j++){
                        if(this.optimizer_response.optimal[i][this.optimizer_response.holiday[j]] == 1){
                            holiday = this.optimizer_response.holiday[j].split('_').map(capitalize).join(' ').replace("Flag ","");
                        }
                    }
                }
                // let seasonality = ''
                // if(this.optimizer_response.optimal[i].SI){
                //     if(this.optimizer_response.optimal[i].SI < 0.95){
                //         seasonality = 'lowholidayweek'
                //     }
                //     else if(this.optimizer_response.optimal[i].SI < 1.05){
                //         seasonality = 'mediumholidayweek'
                //     }
                //     else{
                //         seasonality = 'highholidayweek'
                //     }
                // }
                // console.log(this.optimizer_response.optimal[i].SI,seasonality,"week season")

                let weekObj = {
                    'duration': {
                        'week':"Week "+(i+1),
                        'date': data['simulated']['weekly'][i].date,
                        'holiday': holiday,
                        'si': this.optimizer_response.optimal[i].SI
                    },
                    'promotions': {
                        'promotion_value' : Utils.genratePromotion(
                            data['base']['weekly'][i]['flag_promotype_motivation'],data['base']['weekly'][i]['flag_promotype_n_pls_1'],
                            data['base']['weekly'][i]['flag_promotype_traffic'],data['base']['weekly'][i]['promo_depth'],
                            data['base']['weekly'][i]['co_investment']


                        )
                        ,
                        'promotion_value_simulated':  Utils.genratePromotion(
                            data['simulated']['weekly'][i]['flag_promotype_motivation'],data['simulated']['weekly'][i]['flag_promotype_n_pls_1'],
                            data['simulated']['weekly'][i]['flag_promotype_traffic'],data['simulated']['weekly'][i]['promo_depth'],
                            data['simulated']['weekly'][i]['co_investment']


                        )
                    },
                    'predicted_units': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['predicted_units'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['predicted_units'],true,false),
                        "arrow": data['simulated']['weekly'][i]['predicted_units'] > data['base']['weekly'][i]['predicted_units'] ?  'carret-up' : 'carret-down' ,
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['predicted_units'],data['base']['weekly'][i]['predicted_units']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['predicted_units']-data['base']['weekly'][i]['predicted_units'],true,false) + ")",
                        "color":  this.colorForDifference(data['base']['weekly'][i]['predicted_units'] , data['simulated']['weekly'][i]['predicted_units']),
                    },
                    'base_unit': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['base_unit'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['base_unit'],true,false),
                        "arrow": data['simulated']['weekly'][i]['base_unit'] > data['base']['weekly'][i]['base_unit'] ?  'carret-up' : 'carret-down' ,
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['base_unit'],data['base']['weekly'][i]['base_unit']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['base_unit']-data['base']['weekly'][i]['base_unit'],true,false) + ")",
                        "color":  this.colorForDifference(data['base']['weekly'][i]['base_unit'] , data['simulated']['weekly'][i]['base_unit']),
                    },
                    'incremental_unit': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['incremental_unit'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['incremental_unit'],true,false),
                        "arrow": data['simulated']['weekly'][i]['incremental_unit'] > data['base']['weekly'][i]['incremental_unit'] ?  'carret-up' : 'carret-down' ,
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['incremental_unit'],data['base']['weekly'][i]['incremental_unit']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['incremental_unit']-data['base']['weekly'][i]['incremental_unit'],true,false) + ")",
                        "color":  this.colorForDifference(data['base']['weekly'][i]['incremental_unit'] , data['simulated']['weekly'][i]['incremental_unit']),
                    },
                    'total_weight_in_tons': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['total_weight_in_tons'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['total_weight_in_tons'],true,false),
                        "arrow": data['simulated']['weekly'][i]['total_weight_in_tons'] > data['base']['weekly'][i]['total_weight_in_tons'] ?  'carret-up' : 'carret-down' ,
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['total_weight_in_tons'],data['base']['weekly'][i]['total_weight_in_tons']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['total_weight_in_tons']-data['base']['weekly'][i]['total_weight_in_tons'],true,false) + ")",
                        "color":  this.colorForDifference(data['base']['weekly'][i]['total_weight_in_tons'] , data['simulated']['weekly'][i]['total_weight_in_tons']),
                    },
                    'total_lsv': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['total_lsv'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['total_lsv'],true,false),
                        "arrow": data['simulated']['weekly'][i]['total_lsv'] > data['base']['weekly'][i]['total_lsv']  ?  'carret-up' : 'carret-down' ,
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['total_lsv'],data['base']['weekly'][i]['total_lsv']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['total_lsv']-data['base']['weekly'][i]['total_lsv'],true,false) + ")",
                        "color":  this.colorForDifference(data['base']['weekly'][i]['total_lsv'] , data['simulated']['weekly'][i]['total_lsv']),
                    },
                    'total_nsv': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['total_nsv'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['total_nsv'],true,false),
                        "arrow": data['simulated']['weekly'][i]['total_nsv'] > data['base']['weekly'][i]['total_nsv'] ?  'carret-up' : 'carret-down' ,
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['total_nsv'],data['base']['weekly'][i]['total_nsv']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['total_nsv']-data['base']['weekly'][i]['total_nsv'],true,false) + ")",
                        "color":  this.colorForDifference(data['base']['weekly'][i]['total_nsv'] , data['simulated']['weekly'][i]['total_nsv']),
                    },
                    'mars_mac_percent_of_nsv': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['mars_mac_percent_of_nsv'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'],true,false),
                        "arrow": data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'] > data['base']['weekly'][i]['mars_mac_percent_of_nsv'] ?  'carret-up' : 'carret-down' ,
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'],data['base']['weekly'][i]['mars_mac_percent_of_nsv']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['mars_mac_percent_of_nsv']-data['base']['weekly'][i]['mars_mac_percent_of_nsv'],true,false) + ")",
                        "color":  this.colorForDifference(data['base']['weekly'][i]['mars_mac_percent_of_nsv'] , data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'] ),
                    },
                    'trade_expense': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['trade_expense'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['trade_expense'],true,false),
                        "arrow": data['simulated']['weekly'][i]['trade_expense'] > data['base']['weekly'][i]['trade_expense'] ?  'carret-up' : 'carret-down' ,
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['trade_expense'],data['base']['weekly'][i]['trade_expense']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['trade_expense']-data['base']['weekly'][i]['trade_expense'],true,false) + ")",
                        "color":  this.colorForDifference(data['simulated']['weekly'][i]['trade_expense'],data['base']['weekly'][i]['trade_expense'] ),
                    },
                    'te_percent_of_lsv': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['te_percent_of_lsv'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['te_percent_of_lsv'],true,false),
                        "arrow": data['simulated']['weekly'][i]['te_percent_of_lsv'] > data['base']['weekly'][i]['te_percent_of_lsv'] ?  'carret-up' : 'carret-down' ,
                        "color":  this.colorForDifference( data['simulated']['weekly'][i]['te_percent_of_lsv'],data['base']['weekly'][i]['te_percent_of_lsv'] ),
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['te_percent_of_lsv'],data['base']['weekly'][i]['te_percent_of_lsv']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['te_percent_of_lsv'] - data['base']['weekly'][i]['te_percent_of_lsv'],true,false) + ")"
                    },
                    'lift_percent': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['lift'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['lift'],true,false),
                        "arrow": data['simulated']['weekly'][i]['lift'] > data['base']['weekly'][i]['lift'] ?  'carret-up' : 'carret-down' ,
                        "color":  this.colorForDifference(data['base']['weekly'][i]['lift'] , data['simulated']['weekly'][i]['lift']),
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['lift'],data['base']['weekly'][i]['lift']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['lift']-data['base']['weekly'][i]['lift'],true,false) + ")"
                    },
                    'roi': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['roi'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['roi'],true,false),
                        "arrow": data['simulated']['weekly'][i]['roi'] > data['base']['weekly'][i]['roi'] ?  'carret-up' : 'carret-down' ,
                        "color":  this.colorForDifference(data['base']['weekly'][i]['roi'] , data['simulated']['weekly'][i]['roi'] ),
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['roi'],data['base']['weekly'][i]['roi']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['roi']-data['base']['weekly'][i]['roi'],true,false) + ")"
                    },
                    'promo_asp': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['promo_asp'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['promo_asp'],true,false),
                        "arrow": data['simulated']['weekly'][i]['promo_asp'] > data['base']['weekly'][i]['promo_asp'] ?  'carret-up' : 'carret-down' ,
                        "color": this.colorForDifference(data['base']['weekly'][i]['promo_asp'] , data['simulated']['weekly'][i]['promo_asp']),
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['promo_asp'],data['base']['weekly'][i]['promo_asp']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['promo_asp']-data['base']['weekly'][i]['promo_asp'],true,false) + ")"
                    },
                    'asp': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['asp'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['asp'],true,false),
                        "arrow": data['simulated']['weekly'][i]['asp'] > data['base']['weekly'][i]['asp'] ?  'carret-up' : 'carret-down' ,
                        "color":  this.colorForDifference(data['base']['weekly'][i]['asp'] , data['simulated']['weekly'][i]['asp']),
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['asp'],data['base']['weekly'][i]['asp']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['asp']-data['base']['weekly'][i]['asp'],true,false) + ")"
                    },
                    'te_per_units': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['te_per_units'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['te_per_units'],true,false),
                        "arrow": data['simulated']['weekly'][i]['te_per_units'] > data['base']['weekly'][i]['te_per_units'] ?  'carret-up' : 'carret-down' ,
                        "color":  this.colorForDifference( data['simulated']['weekly'][i]['te_per_units'],data['base']['weekly'][i]['te_per_units'] ),
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['te_per_units'],data['base']['weekly'][i]['te_per_units']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['te_per_units']-data['base']['weekly'][i]['te_per_units'],true,false) + ")"
                    },
                    'total_rsv_w_o_vat': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['total_rsv_w_o_vat'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['total_rsv_w_o_vat'],true,false),
                        "arrow": data['simulated']['weekly'][i]['total_rsv_w_o_vat'] > data['base']['weekly'][i]['total_rsv_w_o_vat'] ?  'carret-up' : 'carret-down' ,
                        "color":  this.colorForDifference(data['base']['weekly'][i]['total_rsv_w_o_vat'] , data['simulated']['weekly'][i]['total_rsv_w_o_vat']),
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['total_rsv_w_o_vat'],data['base']['weekly'][i]['total_rsv_w_o_vat']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['total_rsv_w_o_vat']-data['base']['weekly'][i]['total_rsv_w_o_vat'],true,false) + ")"
                    },
                    'retailer_margin': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['retailer_margin'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['retailer_margin'],true,false),
                        "arrow": data['simulated']['weekly'][i]['retailer_margin'] > data['base']['weekly'][i]['retailer_margin'] ?  'carret-up' : 'carret-down' ,
                        "color":  this.colorForDifference(data['base']['weekly'][i]['retailer_margin'],data['simulated']['weekly'][i]['retailer_margin']),
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['retailer_margin'],data['base']['weekly'][i]['retailer_margin']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['retailer_margin']-data['base']['weekly'][i]['retailer_margin'],true,false) + ")"
                    },
                    'retailer_margin_percent_of_rsp': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false),
                        "arrow": data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'] > data['base']['weekly'][i]['retailer_margin_percent_of_rsp'] ?  'carret-up' : 'carret-down' ,
                        "color":  this.colorForDifference(data['base']['weekly'][i]['retailer_margin_percent_of_rsp'] , data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp']) ,
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'],data['base']['weekly'][i]['retailer_margin_percent_of_rsp']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp']-data['base']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false) + ")"
                    },
                }
                this.weeklyData.push(weekObj)
            }
            console.log(this.weeklyData)
    }

    weeklySubTabClick(key : string){
        if(key == 'Absolute'){
            this.weeklyTab = {
                "absolute": 'selected',
                "percent": 'unselected'
            }
            this.activeWeeklyTab = "absolute"
        }
        else {
            this.weeklyTab = {
                "absolute": 'unselected',
                "percent": 'selected'
            }
            this.activeWeeklyTab = "percent"
        }
    }

    @ViewChild('weekly', { static: false }) weekly: any;
    scrolling_table: any;

    ngAfterViewInit() {
        // this.slider = this.elRef.nativeElement.querySelector('.slide');
        this.scrolling_table = this.elRef.nativeElement.querySelector('.weeklyOptimizertable');
        this.scrolling_table.addEventListener('scroll', this.freeze_pane_listener(this.scrolling_table));
    }

    onChange(deviceValue: any,type: any) {
        if(type == 'base'){
            this.baselineCalDropdown = deviceValue.target.value
            if(this.baselineCalDropdown == 'roi'){
                this.baselineChartLegend = 'ROI';
            }
            else if(this.baselineCalDropdown == 'lift'){
                this.baselineChartLegend = 'Lift %';
            }
            else if(this.baselineCalDropdown == 'si'){
                this.baselineChartLegend = 'Seasonality Index';
            }
        }
        else if(type == 'stimulated'){
            this.stimulatedCalDropdown = deviceValue.target.value
            if(this.stimulatedCalDropdown == 'roi'){
                this.stimulatedChartLegend = 'ROI';
            }
            else if(this.stimulatedCalDropdown == 'lift'){
                this.stimulatedChartLegend = 'Lift %';
            }
            else if(this.stimulatedCalDropdown == 'si'){
                this.stimulatedChartLegend = 'Seasonality Index';
            }
        }
    }

    colorForDifference(base:any, simulated:any){
        if(simulated > base){
            return 'green'
        }
        else if(simulated < base){
            return 'red'
        }
        else if(base == simulated){
            return 'neutral'
        }
        return 'green'
    }

    convertToFormat(value: any){
        let a = new Date(value),
        year = a.getFullYear(),
        month_no = a.getMonth() + 1,
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        month = months[a.getMonth()],
        day:any = a.getDate()
        let obj = {
            date : year +'-'+ month_no + '-' + day,
            month : month,
            year : year,
            day : day
        }
        return obj
    }

    freeze_pane_listener(what_is_this: { scrollTop: string; scrollLeft: string }) {
        return () => {
            var i;
            var self = this;
            self.translate_y = '';

            var translate_y = 'translate(0px,' + what_is_this.scrollTop + 'px)';
            var translate_x = 'translate(' + what_is_this.scrollLeft + 'px)';
            var translate_xy = 'translate(' + what_is_this.scrollLeft + 'px,' + what_is_this.scrollTop + 'px)';

            self.currentTranslateRate = what_is_this.scrollLeft;

            var fixed_vertical_elts = document.getElementsByClassName(
                'freeze_vertical',
            ) as HTMLCollectionOf<HTMLElement>;
            var fixed_horizontal_elts = document.getElementsByClassName(
                'freeze_horizontal',
            ) as HTMLCollectionOf<HTMLElement>;
            var fixed_both_elts = document.getElementsByClassName('freeze') as HTMLCollectionOf<HTMLElement>;

            for (i = 0; i < fixed_horizontal_elts.length; i++) {
                // fixed_horizontal_elts[i].style.webkitTransform = translate_x;
                fixed_horizontal_elts[i].style.transform = translate_x;
            }
            for (i = 0; i < fixed_vertical_elts.length; i++) {
                // fixed_vertical_elts[i].style.webkitTransform = translate_y;
                fixed_vertical_elts[i].style.transform = translate_y;
            }
            for (i = 0; i < fixed_both_elts.length; i++) {
                // fixed_both_elts[i].style.webkitTransform = translate_xy;
                fixed_both_elts[i].style.transform = translate_xy;
            }
        };
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

    openTab = 1;
    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}