import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SimulatorService } from "../../../core/services/simulator.service";
import { OptimizerService } from "../../../core/services/optimizer.service";

@Component({
    selector: 'nwn-promosimulator-builder-aggregated',
    templateUrl: './promosimulator-builder-aggregated.component.html',
    styleUrls: ['./promosimulator-builder-aggregated.component.css'],
})
export class PromosimulatorBuilderAggregatedComponent implements OnInit, AfterViewInit {
    translate_y: string = '';
    currentTranslateRate: string = '';
    constructor(private elRef: ElementRef,public restApi: SimulatorService,public optimize:OptimizerService) {}

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

    ngOnInit(): void {
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

    // Get simulated data
    loadStimulatedData() {
        // this.restApi.getPromoSimulateData(this.restApi.requestData).subscribe((data: any) 
        return this.optimize.getSimulatedDataObservable().subscribe((data: any) => {
            console.log(data , "optimiser graph data")
            if(data){
                this.plChartData = [
                    { group: 'LSV', base: data['base']['total']['lsv'], simulated: data['simulated']['total']['lsv'] },
                    { group: 'Trade Expense', base: data['base']['total']['te'], simulated: data['simulated']['total']['te'] },
                    { group: 'NSV', base: data['base']['total']['nsv'], simulated: data['simulated']['total']['nsv'] },
                    { group: 'COGS', base: data['base']['total']['mac'], simulated: data['simulated']['total']['mac'] },
                    { group: 'MAC', base: data['base']['total']['mac'], simulated: data['simulated']['total']['mac'] },
                    { group: 'RSV v/o VAT', base: data['base']['total']['total_rsv_w_o_vat'], simulated: data['simulated']['total']['total_rsv_w_o_vat'] },
                    { group: 'Customer Margin', base: data['base']['total']['rp'], simulated: data['simulated']['total']['rp'] },
                ]
                this.baselineLiftChartData = [
                    {
                        group: 'Baseline vs Lift',
                        baseline1: [data['base']['total']['units'], data['base']['total']['increment_units']],
                        baseline2: [data['simulated']['total']['units'],  data['simulated']['total']['increment_units']],
                    },
                ];
                
                this.incrementalLift = {
                    "converted_base": this.formatNumber(data['base']['total']['increment_units'],false,false),
                    "converted_simulated": this.formatNumber(data['simulated']['total']['increment_units'],false,false),
                    "percent": "(" + this.percentageDiffrence(data['base']['total']['increment_units'],data['simulated']['total']['increment_units']) + "%)",
                    "converted_difference": "(" + this.formatNumber(data['base']['total']['increment_units']-data['simulated']['total']['increment_units'],false,false) + ")",
                    "arrow": data['base']['total']['increment_units'] > data['simulated']['total']['increment_units'] ? 'carret-down' : 'carret-up',
                    "color": data['base']['total']['increment_units'] > data['simulated']['total']['increment_units'] ? 'red' : 'green'
                }

                this.lsv = {
                    "converted_base": this.formatNumber(data['base']['total']['lsv'],true,false),
                    "converted_simulated": this.formatNumber(data['simulated']['total']['lsv'],true,false),
                    "arrow": data['base']['total']['lsv'] > data['simulated']['total']['lsv'] ? 'carret-down' : 'carret-up',
                    "percent": "(" + this.percentageDiffrence(data['base']['total']['lsv'],data['simulated']['total']['lsv']) + "%)",
                    "converted_difference": "(" + this.formatNumber(data['base']['total']['lsv']-data['simulated']['total']['lsv'],true,false) + ")",
                    "color": data['base']['total']['lsv'] > data['simulated']['total']['lsv'] ? 'red' : 'green',
                }

                this.tradeExpence = {
                    "converted_base": this.formatNumber(data['base']['total']['te'],true,false),
                    "converted_simulated": this.formatNumber(data['simulated']['total']['te'],true,false),
                    "arrow": data['base']['total']['te'] > data['simulated']['total']['te'] ? 'carret-down' : 'carret-up',
                    "percent": "(" + this.percentageDiffrence(data['base']['total']['te'],data['simulated']['total']['te']) + "%)",
                    "converted_difference": "(" + this.formatNumber(data['base']['total']['te']-data['simulated']['total']['te'],true,false) + ")",
                    "color": data['base']['total']['te'] > data['simulated']['total']['te'] ? 'red' : 'green',
                }

                this.nsv = {
                    "converted_base": this.formatNumber(data['base']['total']['nsv'],true,false),
                    "converted_simulated": this.formatNumber(data['simulated']['total']['nsv'],true,false),
                    "arrow": data['base']['total']['nsv'] > data['simulated']['total']['nsv'] ? 'carret-down' : 'carret-up',
                    "percent": "(" + this.percentageDiffrence(data['base']['total']['nsv'],data['simulated']['total']['nsv']) + "%)",
                    "converted_difference": "(" + this.formatNumber(data['base']['total']['nsv']-data['simulated']['total']['nsv'],true,false) + ")",
                    "color":  data['base']['total']['nsv'] > data['simulated']['total']['nsv'] ? 'red' : 'green',
                }

                this.cogs = {
                    "converted_base": this.formatNumber(data['base']['total']['mac'],true,false),
                    "converted_simulated": this.formatNumber(data['simulated']['total']['mac'],true,false),
                    "arrow": data['base']['total']['mac'] > data['simulated']['total']['mac'] ? 'carret-down' : 'carret-up',
                    "percent": "(" + this.percentageDiffrence(data['base']['total']['mac'],data['simulated']['total']['mac']) + "%)",
                    "converted_difference": "(" + this.formatNumber(data['base']['total']['mac']-data['simulated']['total']['mac'],true,false) + ")",
                    "color":  data['base']['total']['mac'] > data['simulated']['total']['mac'] ? 'red' : 'green',
                }

                this.mac = {
                    "converted_base": this.formatNumber(data['base']['total']['mac'],true,false),
                    "converted_simulated": this.formatNumber(data['simulated']['total']['mac'],true,false),
                    "arrow": data['base']['total']['mac'] > data['simulated']['total']['mac'] ? 'carret-down' : 'carret-up',
                    "percent": "(" + this.percentageDiffrence(data['base']['total']['mac'],data['simulated']['total']['mac']) + "%)",
                    "converted_difference": "(" + this.formatNumber(data['base']['total']['mac']-data['simulated']['total']['mac'],true,false) + ")",
                    "color":  data['base']['total']['mac'] > data['simulated']['total']['mac'] ? 'red' : 'green',
                }

                this.rsvWithoutVat = {
                    "converted_base": this.formatNumber(data['base']['total']['total_rsv_w_o_vat'],true,false),
                    "converted_simulated": this.formatNumber(data['simulated']['total']['total_rsv_w_o_vat'],true,false),
                    "arrow": data['base']['total']['total_rsv_w_o_vat'] > data['simulated']['total']['total_rsv_w_o_vat'] ? 'carret-down' : 'carret-up',
                    "percent": "(" + this.percentageDiffrence(data['base']['total']['total_rsv_w_o_vat'],data['simulated']['total']['total_rsv_w_o_vat']) + "%)",
                    "converted_difference": "(" + this.formatNumber(data['base']['total']['total_rsv_w_o_vat']-data['simulated']['total']['total_rsv_w_o_vat'],true,false) + ")",
                    "color":  data['base']['total']['total_rsv_w_o_vat'] > data['simulated']['total']['total_rsv_w_o_vat'] ? 'red' : 'green',
                }

                this.customerMargin = {
                    "converted_base": this.formatNumber(data['base']['total']['rp'],true,false),
                    "converted_simulated": this.formatNumber(data['simulated']['total']['rp'],true,false),
                    "arrow": data['base']['total']['rp'] > data['simulated']['total']['rp'] ? 'carret-down' : 'carret-up',
                    "percent": "(" + this.percentageDiffrence(data['base']['total']['rp'],data['simulated']['total']['rp']) + "%)",
                    "converted_difference": "(" + this.formatNumber(data['base']['total']['rp']-data['simulated']['total']['rp'],true,false) + ")",
                    "color":  data['base']['total']['rp'] > data['simulated']['total']['rp'] ? 'red' : 'green',
                }

                let weeks: number = data['base']['weekly'].length
                for(let i = 0; i < 52; i++){
                    let weekObj = {
                        'duration': {
                            'week':"Week "+(i+1),
                            'date': data['simulated']['weekly'][i].date,
                            "si" : data['simulated']['weekly'][i].si,
                            "tpr" : data['simulated']['weekly'][i].promo_depth,
                            "co_inv" : data['simulated']['weekly'][i].co_nvestment
                        },
                        'predicted_units': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['predicted_units'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['predicted_units'],true,false),
                            "arrow": data['base']['weekly'][i]['predicted_units'] > data['simulated']['weekly'][i]['predicted_units'] ? 'carret-down' : 'carret-up',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['predicted_units'],data['simulated']['weekly'][i]['predicted_units']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['predicted_units']-data['simulated']['weekly'][i]['predicted_units'],true,false) + ")",
                            "color":  data['base']['weekly'][i]['predicted_units'] > data['simulated']['weekly'][i]['predicted_units'] ? 'red' : 'green',
                        },
                        'base_unit': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['base_unit'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['base_unit'],true,false),
                            "arrow": data['base']['weekly'][i]['base_unit'] > data['simulated']['weekly'][i]['base_unit'] ? 'carret-down' : 'carret-up',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['base_unit'],data['simulated']['weekly'][i]['base_unit']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['base_unit']-data['simulated']['weekly'][i]['base_unit'],true,false) + ")",
                            "color":  data['base']['weekly'][i]['base_unit'] > data['simulated']['weekly'][i]['base_unit'] ? 'red' : 'green',
                        },
                        'incremental_unit': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['incremental_unit'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['incremental_unit'],true,false),
                            "arrow": data['base']['weekly'][i]['incremental_unit'] > data['simulated']['weekly'][i]['incremental_unit'] ? 'carret-down' : 'carret-up',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['incremental_unit'],data['simulated']['weekly'][i]['incremental_unit']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['incremental_unit']-data['simulated']['weekly'][i]['incremental_unit'],true,false) + ")",
                            "color":  data['base']['weekly'][i]['incremental_unit'] > data['simulated']['weekly'][i]['incremental_unit'] ? 'red' : 'green',
                        },
                        'total_weight_in_tons': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['total_weight_in_tons'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['total_weight_in_tons'],true,false),
                            "arrow": data['base']['weekly'][i]['total_weight_in_tons'] > data['simulated']['weekly'][i]['total_weight_in_tons'] ? 'carret-down' : 'carret-up',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['total_weight_in_tons'],data['simulated']['weekly'][i]['total_weight_in_tons']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['total_weight_in_tons']-data['simulated']['weekly'][i]['total_weight_in_tons'],true,false) + ")",
                            "color":  data['base']['weekly'][i]['total_weight_in_tons'] > data['simulated']['weekly'][i]['total_weight_in_tons'] ? 'red' : 'green',
                        },
                        'total_lsv': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['total_lsv'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['total_lsv'],true,false),
                            "arrow": data['base']['weekly'][i]['total_lsv'] > data['simulated']['weekly'][i]['total_lsv'] ? 'carret-down' : 'carret-up',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['total_lsv'],data['simulated']['weekly'][i]['total_lsv']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['total_lsv']-data['simulated']['weekly'][i]['total_lsv'],true,false) + ")",
                            "color":  data['base']['weekly'][i]['total_lsv'] > data['simulated']['weekly'][i]['total_lsv'] ? 'red' : 'green',
                        },
                        'total_nsv': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['total_nsv'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['total_nsv'],true,false),
                            "arrow": data['base']['weekly'][i]['total_nsv'] > data['simulated']['weekly'][i]['total_nsv'] ? 'carret-down' : 'carret-up',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['total_nsv'],data['simulated']['weekly'][i]['total_nsv']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['total_nsv']-data['simulated']['weekly'][i]['total_nsv'],true,false) + ")",
                            "color":  data['base']['weekly'][i]['total_nsv'] > data['simulated']['weekly'][i]['total_nsv'] ? 'red' : 'green',
                        },
                        'mars_mac_percent_of_nsv': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['mars_mac_percent_of_nsv'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'],true,false),
                            "arrow": data['base']['weekly'][i]['mars_mac_percent_of_nsv'] > data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'] ? 'carret-down' : 'carret-up',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['mars_mac_percent_of_nsv'],data['simulated']['weekly'][i]['mars_mac_percent_of_nsv']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['mars_mac_percent_of_nsv']-data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'],true,false) + ")",
                            "color":  data['base']['weekly'][i]['mars_mac_percent_of_nsv'] > data['simulated']['weekly'][i]['mars_mac_percent_of_nsv'] ? 'red' : 'green',
                        },
                        'trade_expense': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['trade_expense'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['trade_expense'],true,false),
                            "arrow": data['base']['weekly'][i]['trade_expense'] > data['simulated']['weekly'][i]['trade_expense'] ? 'carret-down' : 'carret-up',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['trade_expense'],data['simulated']['weekly'][i]['trade_expense']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['trade_expense']-data['simulated']['weekly'][i]['trade_expense'],true,false) + ")",
                            "color":  data['base']['weekly'][i]['trade_expense'] > data['simulated']['weekly'][i]['trade_expense'] ? 'red' : 'green',
                        },
                        'te_percent_of_lsv': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['te_percent_of_lsv'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['te_percent_of_lsv'],true,false),
                            "arrow": data['base']['weekly'][i]['te_percent_of_lsv'] > data['simulated']['weekly'][i]['te_percent_of_lsv'] ? 'carret-down' : 'carret-up',
                            "color":  data['base']['weekly'][i]['te_percent_of_lsv'] > data['simulated']['weekly'][i]['te_percent_of_lsv'] ? 'red' : 'green',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['te_percent_of_lsv'],data['simulated']['weekly'][i]['te_percent_of_lsv']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['te_percent_of_lsv']-data['simulated']['weekly'][i]['te_percent_of_lsv'],true,false) + ")"
                        },
                        'lift_percent': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['te_per_units'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['te_per_units'],true,false),
                            "arrow": data['base']['weekly'][i]['te_per_units'] > data['simulated']['weekly'][i]['te_per_units'] ? 'carret-down' : 'carret-up',
                            "color":  data['base']['weekly'][i]['te_per_units'] > data['simulated']['weekly'][i]['te_per_units'] ? 'red' : 'green',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['te_per_units'],data['simulated']['weekly'][i]['te_per_units']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['te_per_units']-data['simulated']['weekly'][i]['te_per_units'],true,false) + ")"
                        },
                        'roi': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['roi'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['roi'],true,false),
                            "arrow": data['base']['weekly'][i]['roi'] > data['simulated']['weekly'][i]['roi'] ? 'carret-down' : 'carret-up',
                            "color":  data['base']['weekly'][i]['roi'] > data['simulated']['weekly'][i]['roi'] ? 'red' : 'green',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['roi'],data['simulated']['weekly'][i]['roi']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['roi']-data['simulated']['weekly'][i]['roi'],true,false) + ")"
                        },
                        'total_uplift_cost': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['total_uplift_cost'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['total_uplift_cost'],true,false),
                            "arrow": data['base']['weekly'][i]['total_uplift_cost'] > data['simulated']['weekly'][i]['total_uplift_cost'] ? 'carret-down' : 'carret-up',
                            "color":  data['base']['weekly'][i]['total_uplift_cost'] > data['simulated']['weekly'][i]['total_uplift_cost'] ? 'red' : 'green',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['total_uplift_cost'],data['simulated']['weekly'][i]['total_uplift_cost']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['total_uplift_cost']-data['simulated']['weekly'][i]['total_uplift_cost'],true,false) + ")"
                        },
                        'asp': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['asp'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['asp'],true,false),
                            "arrow": data['base']['weekly'][i]['asp'] > data['simulated']['weekly'][i]['asp'] ? 'carret-down' : 'carret-up',
                            "color":  data['base']['weekly'][i]['asp'] > data['simulated']['weekly'][i]['asp'] ? 'red' : 'green',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['asp'],data['simulated']['weekly'][i]['asp']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['asp']-data['simulated']['weekly'][i]['asp'],true,false) + ")"
                        },
                        'te_per_units': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['te_per_units'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['te_per_units'],true,false),
                            "arrow": data['base']['weekly'][i]['te_per_units'] > data['simulated']['weekly'][i]['te_per_units'] ? 'carret-down' : 'carret-up',
                            "color":  data['base']['weekly'][i]['te_per_units'] > data['simulated']['weekly'][i]['te_per_units'] ? 'red' : 'green',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['te_per_units'],data['simulated']['weekly'][i]['te_per_units']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['te_per_units']-data['simulated']['weekly'][i]['te_per_units'],true,false) + ")"
                        },
                        'total_rsv_w_o_vat': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['total_rsv_w_o_vat'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['total_rsv_w_o_vat'],true,false),
                            "arrow": data['base']['weekly'][i]['total_rsv_w_o_vat'] > data['simulated']['weekly'][i]['total_rsv_w_o_vat'] ? 'carret-down' : 'carret-up',
                            "color":  data['base']['weekly'][i]['total_rsv_w_o_vat'] > data['simulated']['weekly'][i]['total_rsv_w_o_vat'] ? 'red' : 'green',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['total_rsv_w_o_vat'],data['simulated']['weekly'][i]['total_rsv_w_o_vat']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['total_rsv_w_o_vat']-data['simulated']['weekly'][i]['total_rsv_w_o_vat'],true,false) + ")"
                        },
                        'retailer_margin': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['retailer_margin'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['retailer_margin'],true,false),
                            "arrow": data['base']['weekly'][i]['retailer_margin'] > data['simulated']['weekly'][i]['retailer_margin'] ? 'carret-down' : 'carret-up',
                            "color":  data['base']['weekly'][i]['retailer_margin'] > data['simulated']['weekly'][i]['retailer_margin'] ? 'red' : 'green',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['retailer_margin'],data['simulated']['weekly'][i]['retailer_margin']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['retailer_margin']-data['simulated']['weekly'][i]['retailer_margin'],true,false) + ")"
                        },
                        'retailer_margin_percent_of_rsp': {
                            "converted_base": this.formatNumber(data['base']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false),
                            "converted_simulated": this.formatNumber(data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false),
                            "arrow": data['base']['weekly'][i]['retailer_margin_percent_of_rsp'] > data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'] ? 'carret-down' : 'carret-up',
                            "color":  data['base']['weekly'][i]['retailer_margin_percent_of_rsp'] > data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'] ? 'red' : 'green',
                            "percent": "(" + this.percentageDiffrence(data['base']['weekly'][i]['retailer_margin_percent_of_rsp'],data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp']) + "%)",
                            "converted_difference": "(" + this.formatNumber(data['base']['weekly'][i]['retailer_margin_percent_of_rsp']-data['simulated']['weekly'][i]['retailer_margin_percent_of_rsp'],true,false) + ")"
                        },
                    }
                    this.weeklyData.push(weekObj)
                }
                console.log(this.weeklyData , "weekly data value")
            }
        })
    }

    percentageDiffrence(a: number, b: number){
        if (a == 0 && b == 0){
            return (0).toFixed(2)
        }
        if (a > 0 && b == 0){
            return (100).toFixed(2)
        }
        return  (100 * Math.abs( ( a - b ) / ( (a+b)/2 ) )).toFixed(2);
    }

    formatNumber(number: any,currency: boolean,percentage: boolean){
        var SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];
        // what tier? (determines SI symbol)
        var tier = Math.log10(Math.abs(number)) / 3 | 0;
    
        // if zero, we don't need a suffix
        if(tier == 0) return number.toFixed(2);
    
        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);
    
        // scale the number
        var scaled = number / scale;

        if(currency && percentage){
            return scaled.toFixed(1) + '%';
        }

        if(currency && !percentage){
            return scaled.toFixed(1) + suffix + ' ₽';
        }
        // format number and add suffix
        return scaled.toFixed(1) + suffix;
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
