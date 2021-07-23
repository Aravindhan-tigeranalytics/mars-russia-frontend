import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SimulatorService } from "../../../core/services/simulator.service";
import * as Utils from "../../../core/utils/util"

@Component({
    selector: 'nwn-promosimulator-builder-aggregated',
    templateUrl: './promosimulator-builder-aggregated.component.html',
    styleUrls: ['./promosimulator-builder-aggregated.component.css'],
})
export class PromosimulatorBuilderAggregatedComponent implements OnInit, AfterViewInit {
    translate_y: string = '';
    currentTranslateRate: string = '';
    constructor(private elRef: ElementRef,public restApi: SimulatorService) {

    }

    public weeklyTableWidth: any;
    public weeklyTableHeight: any;
    public aggregatedGraphWidth: any;

    plChartData:any = [];
    baselineLiftChartData:any = []

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

    ngOnInit() {
        this.restApi.uploadedSimulatorDataObservable.asObservable().subscribe(data=>{
            if(data != ''){
                console.log(data,"observable data")
                this.convertToGraphNTableData(data)
            }
        })
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
            this.baselineLiftChartData = [
                {
                    group: 'Baseline vs Lift',
                    baseline1: [data['base']['total']['units'], '200000'],
                    baseline2: [data['simulated']['total']['units'],  '200000'],
                },
            ];
            
            this.incrementalLift = {
                "converted_base": Utils.formatNumber(data['base']['total']['increment_units'],false,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['increment_units'],false,false),
                "percent": "(" + Utils.percentageDifference(data['base']['total']['increment_units'],data['simulated']['total']['increment_units']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['base']['total']['increment_units']-data['simulated']['total']['increment_units'],false,false) + ")",
                "arrow": data['base']['total']['increment_units'] > data['simulated']['total']['increment_units'] ? 'carret-down' : 'carret-up',
                "color": data['base']['total']['increment_units'] > data['simulated']['total']['increment_units'] ? 'red' : 'green'
            }

            this.lsv = {
                "converted_base": Utils.formatNumber(data['base']['total']['lsv'],true,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['lsv'],true,false),
                "arrow": data['base']['total']['lsv'] > data['simulated']['total']['lsv'] ? 'carret-down' : 'carret-up',
                "percent": "(" + Utils.percentageDifference(data['base']['total']['lsv'],data['simulated']['total']['lsv']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['base']['total']['lsv']-data['simulated']['total']['lsv'],true,false) + ")",
                "color": data['base']['total']['lsv'] > data['simulated']['total']['lsv'] ? 'red' : 'green',
            }

            this.tradeExpence = {
                "converted_base": Utils.formatNumber(data['base']['total']['te'],true,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['te'],true,false),
                "arrow": data['base']['total']['te'] > data['simulated']['total']['te'] ? 'carret-down' : 'carret-up',
                "percent": "(" + Utils.percentageDifference(data['base']['total']['te'],data['simulated']['total']['te']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['base']['total']['te']-data['simulated']['total']['te'],true,false) + ")",
                "color": data['base']['total']['te'] > data['simulated']['total']['te'] ? 'red' : 'green',
            }

            this.nsv = {
                "converted_base": Utils.formatNumber(data['base']['total']['nsv'],true,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['nsv'],true,false),
                "arrow": data['base']['total']['nsv'] > data['simulated']['total']['nsv'] ? 'carret-down' : 'carret-up',
                "percent": "(" + Utils.percentageDifference(data['base']['total']['nsv'],data['simulated']['total']['nsv']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['base']['total']['nsv']-data['simulated']['total']['nsv'],true,false) + ")",
                "color":  data['base']['total']['nsv'] > data['simulated']['total']['nsv'] ? 'red' : 'green',
            }

            this.cogs = {
                "converted_base": Utils.formatNumber(data['base']['total']['cogs'],true,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['cogs'],true,false),
                "arrow": data['base']['total']['cogs'] > data['simulated']['total']['cogs'] ? 'carret-down' : 'carret-up',
                "percent": "(" + Utils.percentageDifference(data['base']['total']['cogs'],data['simulated']['total']['cogs']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['base']['total']['cogs']-data['simulated']['total']['cogs'],true,false) + ")",
                "color":  data['base']['total']['cogs'] > data['simulated']['total']['cogs'] ? 'red' : 'green',
            }

            this.mac = {
                "converted_base": Utils.formatNumber(data['base']['total']['mac'],true,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['mac'],true,false),
                "arrow": data['base']['total']['mac'] > data['simulated']['total']['mac'] ? 'carret-down' : 'carret-up',
                "percent": "(" + Utils.percentageDifference(data['base']['total']['mac'],data['simulated']['total']['mac']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['base']['total']['mac']-data['simulated']['total']['mac'],true,false) + ")",
                "color":  data['base']['total']['mac'] > data['simulated']['total']['mac'] ? 'red' : 'green',
            }

            this.rsvWithoutVat = {
                "converted_base": Utils.formatNumber(data['base']['total']['total_rsv_w_o_vat'],true,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['total_rsv_w_o_vat'],true,false),
                "arrow": data['base']['total']['total_rsv_w_o_vat'] > data['simulated']['total']['total_rsv_w_o_vat'] ? 'carret-down' : 'carret-up',
                "percent": "(" + Utils.percentageDifference(data['base']['total']['total_rsv_w_o_vat'],data['simulated']['total']['total_rsv_w_o_vat']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['base']['total']['total_rsv_w_o_vat']-data['simulated']['total']['total_rsv_w_o_vat'],true,false) + ")",
                "color":  data['base']['total']['total_rsv_w_o_vat'] > data['simulated']['total']['total_rsv_w_o_vat'] ? 'red' : 'green',
            }

            this.customerMargin = {
                "converted_base": Utils.formatNumber(data['base']['total']['rp'],true,false),
                "converted_simulated": Utils.formatNumber(data['simulated']['total']['rp'],true,false),
                "arrow": data['base']['total']['rp'] > data['simulated']['total']['rp'] ? 'carret-down' : 'carret-up',
                "percent": "(" + Utils.percentageDifference(data['base']['total']['rp'],data['simulated']['total']['rp']) + "%)",
                "converted_difference": "(" + Utils.formatNumber(data['base']['total']['rp']-data['simulated']['total']['rp'],true,false) + ")",
                "color":  data['base']['total']['rp'] > data['simulated']['total']['rp'] ? 'red' : 'green',
            }

            let weeks: number = data['base']['weekly'].length
            for(let i = 0; i < 52; i++){
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
                let weekObj = {
                    'duration': {
                        'week':"Week "+(i+1),
                        'date': data['simulated']['weekly'][i].date
                    },
                    'promotions': {
                        'promotion_value' : promotion_value,
                        'coinvestment': data['base']['weekly'][i]['co_investment']
                    },
                    'predicted_units': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['predicted_units'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['predicted_units'],true,false),
                        "arrow": data['base']['weekly'][i]['predicted_units'] > data['simulated']['weekly'][i]['predicted_units'] ? 'carret-down' : 'carret-up',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['predicted_units'],data['simulated']['weekly'][i]['predicted_units']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['predicted_units']-data['simulated']['weekly'][i]['predicted_units'],true,false) + ")",
                        "color":  data['base']['weekly'][i]['predicted_units'] > data['simulated']['weekly'][i]['predicted_units'] ? 'red' : 'green',
                    },
                    'base_unit': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['base_unit'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['base_unit'],true,false),
                        "arrow": data['base']['weekly'][i]['base_unit'] > data['simulated']['weekly'][i]['base_unit'] ? 'carret-down' : 'carret-up',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['base_unit'],data['simulated']['weekly'][i]['base_unit']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['base_unit']-data['simulated']['weekly'][i]['base_unit'],true,false) + ")",
                        "color":  data['base']['weekly'][i]['base_unit'] > data['simulated']['weekly'][i]['base_unit'] ? 'red' : 'green',
                    },
                    'incremental_unit': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['incremental_unit'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['incremental_unit'],true,false),
                        "arrow": data['base']['weekly'][i]['incremental_unit'] > data['simulated']['weekly'][i]['incremental_unit'] ? 'carret-down' : 'carret-up',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['incremental_unit'],data['simulated']['weekly'][i]['incremental_unit']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['incremental_unit']-data['simulated']['weekly'][i]['incremental_unit'],true,false) + ")",
                        "color":  data['base']['weekly'][i]['incremental_unit'] > data['simulated']['weekly'][i]['incremental_unit'] ? 'red' : 'green',
                    },
                    'total_weight_in_tons': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['total_weight_in_tons'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['total_weight_in_tons'],true,false),
                        "arrow": data['base']['weekly'][i]['total_weight_in_tons'] > data['simulated']['weekly'][i]['total_weight_in_tons'] ? 'carret-down' : 'carret-up',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['total_weight_in_tons'],data['simulated']['weekly'][i]['total_weight_in_tons']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['total_weight_in_tons']-data['simulated']['weekly'][i]['total_weight_in_tons'],true,false) + ")",
                        "color":  data['base']['weekly'][i]['total_weight_in_tons'] > data['simulated']['weekly'][i]['total_weight_in_tons'] ? 'red' : 'green',
                    },
                    'total_lsv': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['total_lsv'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['total_lsv'],true,false),
                        "arrow": data['base']['weekly'][i]['total_lsv'] > data['simulated']['weekly'][i]['total_lsv'] ? 'carret-down' : 'carret-up',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['total_lsv'],data['simulated']['weekly'][i]['total_lsv']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['total_lsv']-data['simulated']['weekly'][i]['total_lsv'],true,false) + ")",
                        "color":  data['base']['weekly'][i]['total_lsv'] > data['simulated']['weekly'][i]['total_lsv'] ? 'red' : 'green',
                    },
                    'total_nsv': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['total_nsv'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['total_nsv'],true,false),
                        "arrow": data['base']['weekly'][i]['total_nsv'] > data['simulated']['weekly'][i]['total_nsv'] ? 'carret-down' : 'carret-up',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['total_nsv'],data['simulated']['weekly'][i]['total_nsv']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['total_nsv']-data['simulated']['weekly'][i]['total_nsv'],true,false) + ")",
                        "color":  data['base']['weekly'][i]['total_nsv'] > data['simulated']['weekly'][i]['total_nsv'] ? 'red' : 'green',
                    },
                    'mars_mac_percent_of_nsv': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['mars_mac_percent_of_nsv'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'],true,false),
                        "arrow": data['base']['weekly'][i]['mars_mac_percent_of_nsv'] > data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'] ? 'carret-down' : 'carret-up',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['mars_mac_percent_of_nsv'],data['simulated']['weekly'][i]['mars_mac_percent_of_nsv']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['mars_mac_percent_of_nsv']-data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'],true,false) + ")",
                        "color":  data['base']['weekly'][i]['mars_mac_percent_of_nsv'] > data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'] ? 'red' : 'green',
                    },
                    'trade_expense': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['trade_expense'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['trade_expense'],true,false),
                        "arrow": data['base']['weekly'][i]['trade_expense'] > data['simulated']['weekly'][i]['trade_expense'] ? 'carret-down' : 'carret-up',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['trade_expense'],data['simulated']['weekly'][i]['trade_expense']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['trade_expense']-data['simulated']['weekly'][i]['trade_expense'],true,false) + ")",
                        "color":  data['base']['weekly'][i]['trade_expense'] > data['simulated']['weekly'][i]['trade_expense'] ? 'red' : 'green',
                    },
                    'te_percent_of_lsv': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['te_percent_of_lsv'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['te_percent_of_lsv'],true,false),
                        "arrow": data['base']['weekly'][i]['te_percent_of_lsv'] > data['simulated']['weekly'][i]['te_percent_of_lsv'] ? 'carret-down' : 'carret-up',
                        "color":  data['base']['weekly'][i]['te_percent_of_lsv'] > data['simulated']['weekly'][i]['te_percent_of_lsv'] ? 'red' : 'green',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['te_percent_of_lsv'],data['simulated']['weekly'][i]['te_percent_of_lsv']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['te_percent_of_lsv']-data['simulated']['weekly'][i]['te_percent_of_lsv'],true,false) + ")"
                    },
                    'lift_percent': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['lift'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['lift'],true,false),
                        "arrow": data['base']['weekly'][i]['lift'] > data['simulated']['weekly'][i]['lift'] ? 'carret-down' : 'carret-up',
                        "color":  data['base']['weekly'][i]['lift'] > data['simulated']['weekly'][i]['lift'] ? 'red' : 'green',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['lift'],data['simulated']['weekly'][i]['lift']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['lift']-data['simulated']['weekly'][i]['lift'],true,false) + ")"
                    },
                    'roi': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['roi'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['roi'],true,false),
                        "arrow": data['base']['weekly'][i]['roi'] > data['simulated']['weekly'][i]['roi'] ? 'carret-down' : 'carret-up',
                        "color":  data['base']['weekly'][i]['roi'] > data['simulated']['weekly'][i]['roi'] ? 'red' : 'green',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['roi'],data['simulated']['weekly'][i]['roi']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['roi']-data['simulated']['weekly'][i]['roi'],true,false) + ")"
                    },
                    'total_uplift_cost': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['total_uplift_cost'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['total_uplift_cost'],true,false),
                        "arrow": data['base']['weekly'][i]['total_uplift_cost'] > data['simulated']['weekly'][i]['total_uplift_cost'] ? 'carret-down' : 'carret-up',
                        "color":  data['base']['weekly'][i]['total_uplift_cost'] > data['simulated']['weekly'][i]['total_uplift_cost'] ? 'red' : 'green',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['total_uplift_cost'],data['simulated']['weekly'][i]['total_uplift_cost']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['total_uplift_cost']-data['simulated']['weekly'][i]['total_uplift_cost'],true,false) + ")"
                    },
                    'asp': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['asp'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['asp'],true,false),
                        "arrow": data['base']['weekly'][i]['asp'] > data['simulated']['weekly'][i]['asp'] ? 'carret-down' : 'carret-up',
                        "color":  data['base']['weekly'][i]['asp'] > data['simulated']['weekly'][i]['asp'] ? 'red' : 'green',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['asp'],data['simulated']['weekly'][i]['asp']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['asp']-data['simulated']['weekly'][i]['asp'],true,false) + ")"
                    },
                    'te_per_units': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['te_per_units'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['te_per_units'],true,false),
                        "arrow": data['base']['weekly'][i]['te_per_units'] > data['simulated']['weekly'][i]['te_per_units'] ? 'carret-down' : 'carret-up',
                        "color":  data['base']['weekly'][i]['te_per_units'] > data['simulated']['weekly'][i]['te_per_units'] ? 'red' : 'green',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['te_per_units'],data['simulated']['weekly'][i]['te_per_units']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['te_per_units']-data['simulated']['weekly'][i]['te_per_units'],true,false) + ")"
                    },
                    'total_rsv_w_o_vat': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['total_rsv_w_o_vat'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['total_rsv_w_o_vat'],true,false),
                        "arrow": data['base']['weekly'][i]['total_rsv_w_o_vat'] > data['simulated']['weekly'][i]['total_rsv_w_o_vat'] ? 'carret-down' : 'carret-up',
                        "color":  data['base']['weekly'][i]['total_rsv_w_o_vat'] > data['simulated']['weekly'][i]['total_rsv_w_o_vat'] ? 'red' : 'green',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['total_rsv_w_o_vat'],data['simulated']['weekly'][i]['total_rsv_w_o_vat']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['total_rsv_w_o_vat']-data['simulated']['weekly'][i]['total_rsv_w_o_vat'],true,false) + ")"
                    },
                    'retailer_margin': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['retailer_margin'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['retailer_margin'],true,false),
                        "arrow": data['base']['weekly'][i]['retailer_margin'] > data['simulated']['weekly'][i]['retailer_margin'] ? 'carret-down' : 'carret-up',
                        "color":  data['base']['weekly'][i]['retailer_margin'] > data['simulated']['weekly'][i]['retailer_margin'] ? 'red' : 'green',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['retailer_margin'],data['simulated']['weekly'][i]['retailer_margin']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['retailer_margin']-data['simulated']['weekly'][i]['retailer_margin'],true,false) + ")"
                    },
                    'retailer_margin_percent_of_rsp': {
                        "converted_base": Utils.formatNumber(data['base']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false),
                        "converted_simulated": Utils.formatNumber(data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false),
                        "arrow": data['base']['weekly'][i]['retailer_margin_percent_of_rsp'] > data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'] ? 'carret-down' : 'carret-up',
                        "color":  data['base']['weekly'][i]['retailer_margin_percent_of_rsp'] > data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'] ? 'red' : 'green',
                        "percent": "(" + Utils.percentageDifference(data['base']['weekly'][i]['retailer_margin_percent_of_rsp'],data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp']) + "%)",
                        "converted_difference": "(" + Utils.formatNumber(data['base']['weekly'][i]['retailer_margin_percent_of_rsp']-data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false) + ")"
                    },
                }
                this.weeklyData.push(weekObj)
            }
            console.log(this.weeklyData)
        }
    }

    // Get simulated data
    loadStimulatedData() {
        this.restApi.getPromoSimulateData(this.restApi.requestData).subscribe((data: any) => {
            this.convertToGraphNTableData(data)
        })
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
