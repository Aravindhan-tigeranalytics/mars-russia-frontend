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
    activeAggregatedTab: string = 'absolute'

    aggregatedTableCols = ['Units','Base units','Inc units','Volume','LSV','NSV','MAC','MAC, %NSV','Trade expense','Customer Margin']
    aggregatedTableData:any = []


    ngOnInit(): void {
        this.weeklyTableWidth = window.innerWidth - 155;
        this.weeklyTableHeight = window.innerHeight - 150;
        this.aggregatedGraphWidth = (window.innerWidth - 155) / 2;
        // setTimeout(()=>{
            this.getChartData()
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
        let optimizerResponse = this.restApi.responseData.optimal
        let metrics: any = []
        for(let i=0; i < optimizerResponse.length; i++){
            let durationObj = this.convertToFormat(optimizerResponse[i].Date) 
            let week = optimizerResponse[i].week
            let holiday = false
            if(this.restApi.responseData.holiday.length > 0){
                for(let j = 0; j < this.restApi.responseData.holiday.length; j++){
                    if(optimizerResponse[i][this.restApi.responseData.holiday[j]] == 1){
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
                holidayNames : this.restApi.responseData.holiday
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
                holidayNames : this.restApi.responseData.holiday
            })
        }

        
        for(let j = 0; j < this.aggregatedTableCols.length; j++){
            let obj = this.restApi.responseData.summary.find(o => o.Metric === this.aggregatedTableCols[j]);
            if(obj != undefined){
                this.aggregatedTableData.push({
                    "base": Utils.formatNumber(obj['Base_Scenario'],false,false),
                    "simulated": Utils.formatNumber(obj['Recommended_Scenario'],false,false),
                    "percent": "(" + Utils.percentageDifference(obj['Base_Scenario'],obj['Recommended_Scenario']) + "%)",
                    "difference": "(" + Utils.formatNumber(obj['Base_Scenario']-obj['Recommended_Scenario'],false,false) + ")",
                    "arrow": obj['Base_Scenario'] > obj['Recommended_Scenario'] ? 'carret-down' : 'carret-up'
                })
            }
            else{
                this.aggregatedTableData.push({
                    "base": Utils.formatNumber(this.restApi.responseData.summary[0]['Base_Scenario'],false,false),
                    "simulated": Utils.formatNumber(this.restApi.responseData.summary[0]['Recommended_Scenario'],false,false),
                    "percent": "(" + Utils.percentageDifference(this.restApi.responseData.summary[0]['Base_Scenario'],this.restApi.responseData.summary[0]['Recommended_Scenario']) + "%)",
                    "difference": "(" + Utils.formatNumber(this.restApi.responseData.summary[0]['Base_Scenario']-this.restApi.responseData.summary[0]['Recommended_Scenario'],false,false) + ")",
                    "arrow": this.restApi.responseData.summary[0]['Base_Scenario'] > this.restApi.responseData.summary[0]['Recommended_Scenario'] ? 'carret-down' : 'carret-up'
                })
            }
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
