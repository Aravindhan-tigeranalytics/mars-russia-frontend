import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SimulatorService } from "../../../core/services/simulator.service";
import { OptimizerService } from "../../../core/services/optimizer.service";
import * as Utils from "../../../core/utils/util"
import * as $ from 'jquery';

@Component({
    selector: 'nwn-promosimulator-builder-aggregated',
    templateUrl: './promosimulator-builder-aggregated.component.html',
    styleUrls: ['./promosimulator-builder-aggregated.component.css'],
})
export class PromosimulatorBuilderAggregatedComponent implements OnInit, AfterViewInit {
    @ViewChild('scrollOne') scrollOne: ElementRef;
    @ViewChild('scrollTwo') scrollTwo: ElementRef;
    translate_y: string = '';
    currentTranslateRate: string = '';
    constructor(private elRef: ElementRef,public restApi: SimulatorService,public optimize:OptimizerService) {}

    public weeklyTableWidth: any;
    public weeklyTableHeight: any;
    public aggregatedGraphWidth: any;

    plChartData:any = [];
    baselineLiftChartData:any = []

    baseline:any
    incrementalLift:any 
    lsv:any
    tradeExpence:any
    nsv:any
    cogs:any
    mac:any
    rsvWithoutVat:any
    customerMargin:any

    weeklyData:any = []

    weeklyTab:any = {
        "absolute": 'selected',
        "percent": 'unselected'
    }

    aggregatedTab:any = {
        "absolute": 'selected',
        "percent": 'unselected'
    }

    activeWeeklyTab: string = 'absolute'
    activeAggregatedTab: string = 'absolute'

    updateScroll(value:any){
        if(value == 'Graph'){
            const scrollOne = this.scrollOne.nativeElement as HTMLElement;
            const scrollTwo = this.scrollTwo.nativeElement as HTMLElement;

            scrollTwo.scrollLeft = scrollOne.scrollLeft;
        }
        else if(value == 'Table'){
            const scrollOne = this.scrollOne.nativeElement as HTMLElement;
            const scrollTwo = this.scrollTwo.nativeElement as HTMLElement;

            scrollOne.scrollLeft = scrollTwo.scrollLeft;
        }
      }

    ngOnInit() {
        // $(document).ready(function() {
        //     $('#div2').on('scroll', function () {
        //       $('#div1').scrollLeft($(this).scrollLeft());
        //     });
        // });
        // this.restApi.uploadedSimulatorDataObservable.asObservable().subscribe(data=>{
        //     if(data != ''){
        //         console.log(data,"observable data")
        //         this.convertToGraphNTableData(data)
        //     }
        // })
        this.weeklyTableWidth = window.innerWidth - 155;
        this.weeklyTableHeight = window.innerHeight - 150;
        this.aggregatedGraphWidth = window.innerWidth - 155;
        this.loadStimulatedData()
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

    get_holiday_information(holiday , data){
        let ret : string = null as any
        if(holiday){
            // debugger
            data.forEach(element => {
                console.log(element , "retttttttttttttttttt element")
                // coefficient_old: "flag_russian_day", coefficient_new: "Holiday_Flag1"
                if(element['coefficient_new'].split("_").join("").toLowerCase() == holiday.split("_").join("").toLowerCase()){
                    // console.log("retttttttttttttttttttttttttttttttttt",element['coefficient_old'])
                    // console.log("retttttttttttttttttttttttttttttttttt",typeof(element['coefficient_old']))
                   ret = String(element['coefficient_old']).replace("flag_" , "").split("_").join(" ")

                }
                
            });
        }
        return ret

    }

    convertToGraphNTableData(data: any){
        if(data){
            this.plChartData = [
                { group: 'LSV', base: data['base']['total']['lsv'], simulated: data['simulated']['total']['lsv'] },
                { group: 'Trade Expense', base: data['base']['total']['te'], simulated: data['simulated']['total']['te'] },
                { group: 'NSV', base: data['base']['total']['nsv'], simulated: data['simulated']['total']['nsv'] },
                { group: 'COGS', base: data['base']['total']['cogs'], simulated: data['simulated']['total']['cogs'] },
                { group: 'MAC', base: data['base']['total']['mac'], simulated: data['simulated']['total']['mac'] },
                { group: 'RSV v/o VAT', base: data['base']['total']['total_rsv_w_o_vat'], simulated: data['simulated']['total']['total_rsv_w_o_vat'] },
                { group: 'Customer Margin', base: data['base']['total']['rp'], simulated: data['simulated']['total']['rp'] },
            ]
            console.log(this.plChartData,"checkhere")
            this.baselineLiftChartData = [
                {
                    group: 'Baseline vs Incremental',
                    baseline1: [data['base']['total']['units'], data['base']['total']['increment_units']],
                    baseline2: [data['simulated']['total']['units'],  data['simulated']['total']['increment_units']],
                },
            ];

            this.baseline = {
                "converted_base": Utils.formatNumber(data['base']['total']['units'],false,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['units'],false,false),
                "percent": "(" + Utils.percentageDifference(data['simulated']['total']['units'],data['base']['total']['units']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['simulated']['total']['units']-data['base']['total']['units'],false,false) + ")",
                "arrow": data['simulated']['total']['units'] >  data['base']['total']['units']?  'carret-up' : 'carret-down' ,
                "color": this.colorForDifference(data['base']['total']['units'] , data['simulated']['total']['units']) 
            }

            
            this.incrementalLift = {
                "converted_base": Utils.formatNumber(data['base']['total']['increment_units'],false,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['increment_units'],false,false),
                "percent": "(" + Utils.percentageDifference(data['simulated']['total']['increment_units'],data['base']['total']['increment_units']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['simulated']['total']['increment_units']-data['base']['total']['increment_units'],false,false) + ")",
                "arrow": data['simulated']['total']['increment_units'] >  data['base']['total']['increment_units']?  'carret-up' : 'carret-down' ,
                "color": this.colorForDifference(data['base']['total']['increment_units'] , data['simulated']['total']['increment_units']) 
            }

            this.lsv = {
                "converted_base": Utils.formatNumber(data['base']['total']['lsv'],true,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['lsv'],true,false),
                "arrow":  data['simulated']['total']['lsv'] > data['base']['total']['lsv'] ?  'carret-up' : 'carret-down' ,
                "percent": "(" + Utils.percentageDifference(data['simulated']['total']['lsv'],data['base']['total']['lsv']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['simulated']['total']['lsv']-data['base']['total']['lsv'],true,false) + ")",
                "color": this.colorForDifference(data['base']['total']['lsv'],data['simulated']['total']['lsv']),
            }

            this.tradeExpence = {
                "converted_base": Utils.formatNumber(data['base']['total']['te'],true,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['te'],true,false),
                "arrow":  data['simulated']['total']['te'] > data['base']['total']['te'] ?  'carret-up' : 'carret-down' ,
                "percent": "(" + Utils.percentageDifference(data['simulated']['total']['te'],data['base']['total']['te']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['simulated']['total']['te']-data['base']['total']['te'],true,false) + ")",
                "color": this.colorForDifference(data['base']['total']['te'] , data['simulated']['total']['te']),
            }

            this.nsv = {
                "converted_base": Utils.formatNumber(data['base']['total']['nsv'],true,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['nsv'],true,false),
                "arrow":  data['simulated']['total']['nsv'] > data['base']['total']['nsv'] ? 'carret-up' : 'carret-down' ,
                "percent": "(" + Utils.percentageDifference(data['simulated']['total']['nsv'],data['base']['total']['nsv']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['simulated']['total']['nsv'] - data['base']['total']['nsv'],true,false) + ")",
                "color":  this.colorForDifference(data['base']['total']['nsv'] , data['simulated']['total']['nsv']),
            }

            this.cogs = {
                "converted_base": Utils.formatNumber(data['base']['total']['cogs'],true,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['cogs'],true,false),
                "arrow": data['simulated']['total']['cogs'] > data['base']['total']['cogs'] ?  'carret-up' : 'carret-down' ,
                "percent": "(" + Utils.percentageDifference(data['simulated']['total']['cogs'],data['base']['total']['cogs']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['simulated']['total']['cogs']-data['base']['total']['cogs'],true,false) + ")",
                "color":  this.colorForDifference(data['base']['total']['cogs'] , data['simulated']['total']['cogs']),
            }

            this.mac = {
                "converted_base": Utils.formatNumber(data['base']['total']['mac'],true,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['mac'],true,false),
                "arrow": data['simulated']['total']['mac'] > data['base']['total']['mac'] ? 'carret-up' : 'carret-down' ,
                "percent": "(" + Utils.percentageDifference(data['simulated']['total']['mac'],data['base']['total']['mac']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['simulated']['total']['mac']-data['base']['total']['mac'],true,false) + ")",
                "color":  this.colorForDifference(data['base']['total']['mac'] , data['simulated']['total']['mac'] ),
            }

            this.rsvWithoutVat = {
                "converted_base": Utils.formatNumber(data['base']['total']['total_rsv_w_o_vat'],true,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['total_rsv_w_o_vat'],true,false),
                "arrow": data['simulated']['total']['total_rsv_w_o_vat'] > data['base']['total']['total_rsv_w_o_vat'] ?  'carret-up' : 'carret-down' ,
                "percent": "(" + Utils.percentageDifference(data['simulated']['total']['total_rsv_w_o_vat'],data['base']['total']['total_rsv_w_o_vat']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['simulated']['total']['total_rsv_w_o_vat'] - data['base']['total']['total_rsv_w_o_vat'],true,false) + ")",
                "color":  this.colorForDifference(data['base']['total']['total_rsv_w_o_vat'] , data['simulated']['total']['total_rsv_w_o_vat']),
            }

            this.customerMargin = {
                "converted_base": Utils.formatNumber(data['base']['total']['rp'],true,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['rp'],true,false),
                "arrow": data['simulated']['total']['rp'] > data['base']['total']['rp'] ?  'carret-up' : 'carret-down' ,
                "percent": "(" + Utils.percentageDifference(data['simulated']['total']['rp'],data['base']['total']['rp']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['simulated']['total']['rp']-data['base']['total']['rp'],true,false) + ")",
                "color":  this.colorForDifference(data['base']['total']['rp'] , data['simulated']['total']['rp']),
            }

            let weeks: number = data['base']['weekly'].length
            // debugger;
            for(let i = 0; i < 52; i++){
                let promotion_value = ''
                let promotion_value_simulated = ''
                // debugger
                promotion_value =  Utils.genratePromotion(
                    data['base']['weekly'][i]['flag_promotype_motivation'],
                    data['base']['weekly'][i]['flag_promotype_n_pls_1'],
                    data['base']['weekly'][i]['flag_promotype_traffic'],
                    data['base']['weekly'][i]['promo_depth'],
                    data['base']['weekly'][i]['co_investment']
                )
                promotion_value_simulated =  Utils.genratePromotion(
                    data['simulated']['weekly'][i]['flag_promotype_motivation'],
                    data['simulated']['weekly'][i]['flag_promotype_n_pls_1'],
                    data['simulated']['weekly'][i]['flag_promotype_traffic'],
                    data['simulated']['weekly'][i]['promo_depth'],
                    data['simulated']['weekly'][i]['co_investment']
                )
                // if(data['base']['weekly'][i]['flag_promotype_motivation'] == 1){
                //     promotion_value = 'Motivation - '+data['base']['weekly'][i]['promo_depth']+'%';
                // }
                // else if(data['base']['weekly'][i]['flag_promotype_n_pls_1'] == 1){
                //     promotion_value = 'N+1 - '+data['base']['weekly'][i]['promo_depth']+'%';
                // }
                // else if(data['base']['weekly'][i]['flag_promotype_traffic'] == 1){
                //     promotion_value = 'Traffic - '+data['base']['weekly'][i]['promo_depth']+'%';
                // }
                // else{
                //     promotion_value = 'TPR - '+data['base']['weekly'][i]['promo_depth']+'%';
                // }
                // debugger;
                 
                let weekObj = {
                    'duration': {
                        'week':"Week "+(i+1),
                        'date': data['simulated']['weekly'][i].date,
                        "si" : data['simulated']['weekly'][i].si,
                        "holiday" : this.get_holiday_information(data['base']['weekly'][i].holiday , 
                        data['holiday_array']
                        )
                          , 
                    },
                    'promotions': {
                        'promotion_value' : promotion_value,
                        'promotion_value_simulated' : promotion_value_simulated,
                        'coinvestment': data['base']['weekly'][i]['co_investment']
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
                        "arrow": data['simulated']['weekly'][i]['total_lsv'] > data['base']['weekly'][i]['total_lsv'] ?  'carret-up' : 'carret-down' ,
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
                        "color":  this.colorForDifference(data['base']['weekly'][i]['mars_mac_percent_of_nsv'] , data['simulated']['weekly'][i]['mars_mac_percent_of_nsv']),
                    },
                    'trade_expense': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['trade_expense'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['trade_expense'],true,false),
                        "arrow": data['simulated']['weekly'][i]['trade_expense'] > data['base']['weekly'][i]['trade_expense'] ?  'carret-up' : 'carret-down' ,
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['trade_expense'],data['base']['weekly'][i]['trade_expense']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['trade_expense']-data['base']['weekly'][i]['trade_expense'],true,false) + ")",
                        "color":  this.colorForDifference(data['base']['weekly'][i]['trade_expense'] , data['simulated']['weekly'][i]['trade_expense']),
                    },
                    'te_percent_of_lsv': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['te_percent_of_lsv'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['te_percent_of_lsv'],true,false),
                        "arrow": data['simulated']['weekly'][i]['te_percent_of_lsv'] > data['base']['weekly'][i]['te_percent_of_lsv'] ?  'carret-up' : 'carret-down' ,
                        "color": this.colorForDifference(data['base']['weekly'][i]['te_percent_of_lsv'] , data['simulated']['weekly'][i]['te_percent_of_lsv']),
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['te_percent_of_lsv'],data['base']['weekly'][i]['te_percent_of_lsv']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['te_percent_of_lsv']-data['base']['weekly'][i]['te_percent_of_lsv'],true,false) + ")"
                    },
                    'lift_percent': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['lift'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['lift'],true,false),
                        "arrow": data['simulated']['weekly'][i]['lift'] > data['base']['weekly'][i]['lift'] ?  'carret-up' : 'carret-down' ,
                        "color": this.colorForDifference(data['base']['weekly'][i]['lift'] , data['simulated']['weekly'][i]['lift']),
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['lift'],data['base']['weekly'][i]['lift']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['lift']-data['base']['weekly'][i]['lift'],true,false) + ")"
                    },
                    'roi': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['roi'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['roi'],true,false),
                        "arrow": data['simulated']['weekly'][i]['roi'] > data['base']['weekly'][i]['roi'] ?  'carret-up' : 'carret-down' ,
                        "color": this.colorForDifference(data['base']['weekly'][i]['roi'] , data['simulated']['weekly'][i]['roi']),
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
                        "color":  this.colorForDifference(data['base']['weekly'][i]['te_per_units'] , data['simulated']['weekly'][i]['te_per_units']),
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
                        "arrow": data['simulated']['weekly'][i]['retailer_margin'] > data['base']['weekly'][i]['retailer_margin']  ?  'carret-up' : 'carret-down' ,
                        "color":  this.colorForDifference(data['base']['weekly'][i]['retailer_margin'] , data['simulated']['weekly'][i]['retailer_margin']),
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['retailer_margin'],data['base']['weekly'][i]['retailer_margin']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['retailer_margin']-data['base']['weekly'][i]['retailer_margin'],true,false) + ")"
                    },
                    'retailer_margin_percent_of_rsp': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false),
                        "arrow":data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'] > data['base']['weekly'][i]['retailer_margin_percent_of_rsp'] ?  'carret-up' : 'carret-down' ,
                        "color":  this.colorForDifference(data['base']['weekly'][i]['retailer_margin_percent_of_rsp'] , data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp']),
                        "percent": "(" + Utils.percentageDifference(data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'],data['base']['weekly'][i]['retailer_margin_percent_of_rsp']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp']-data['base']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false) + ")"
                    },
                }
                this.weeklyData.push(weekObj)
            }
            console.log(this.weeklyData)
        }
    }

    // Get simulated data
    loadStimulatedData() {
        this.optimize.getSimulatedDataObservable().subscribe((data: any) => {
            console.log(data , "holiday information with data")
            this.convertToGraphNTableData(data)
        })
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

    @ViewChild('weekly', { static: false }) weekly: any;
    scrolling_table: any;

    ngAfterViewInit() {
        // this.slider = this.elRef.nativeElement.querySelector('.slide');
        this.scrolling_table = this.elRef.nativeElement.querySelector('.weeklyScenariotable');
        this.scrolling_table.addEventListener('scroll', this.freeze_pane_listener(this.scrolling_table));
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

    singleSelect: any = [{
        _id: '1year',
        index: 1,
        balance: '$2,984.98',
        picture: 'http://placehold.it/32x32',
        name: '1 years',
    }];
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
