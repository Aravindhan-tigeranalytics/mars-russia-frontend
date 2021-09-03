import { Component, OnInit, AfterViewInit, ViewChild, ElementRef,Input,SimpleChanges, Output,
EventEmitter } from '@angular/core';
import { LoadedScenarioModel , PromoSimulatedTotalModel , CompareMetricModel } from '@core/models';
import { ModalService } from '@molecules/modal/modal.service';
import * as Utils from "@core/utils"
// import { EventEmitter } from 'stream';
@Component({
    selector: 'nwn-kpi-metrics',
    templateUrl: './kpi-metrics.component.html',
    styleUrls: ['./kpi-metrics.component.css'],
})
export class KpiMetricsComponent implements OnInit, AfterViewInit {
    format = "absolute"
    abs_selected:string = "selected"
    per_selected:string = "unselected"
    translate_y: string = '';
    currentTranslateRate: string = '';
    @Input()
    loaded_scenario:Array<LoadedScenarioModel> = []
    @Output()
    deleteCompareEvent  = new EventEmitter()
    units:CompareMetricModel = {"value" : [],"visible": false , key:"Units"}
    // units_compare:CompareMetricModel = {"value" : [],"visible": false}
    base_units:CompareMetricModel = {"value" : [],"visible": false , key:"Base Units"}
    increment_units :CompareMetricModel = {"value" : [],"visible": false,key:"Incremental Units"}
    volume:CompareMetricModel = {"value" : [],"visible": false,key:"Volume"}
    lsv:CompareMetricModel = {"value" : [],"visible": false,key:"LSV"}
    nsv:CompareMetricModel = {"value" : [],"visible": false,key:"NSV Units"}
    mac:CompareMetricModel = {"value" : [],"visible": false,key:"MAC"}
    mac_per_nsv:CompareMetricModel = {"value" : [],"visible": false,key:"MAC, %NSV"}
    te:CompareMetricModel = {"value" : [],"visible": false,key:""}
    te_per_lsv:CompareMetricModel = {"value" : [],"visible": false,key:"TE, % LSV"}
    te_per_unit:CompareMetricModel = {"value" : [],"visible": false,key:"TE / Unit"}
    roi:CompareMetricModel = {"value" : [],"visible": false,key:"ROI"}
    lift:CompareMetricModel = {"value" : [],"visible": false,key:"Lift %"}
    scenario_names:Array<any> = []
    asp:CompareMetricModel = {"value" : [],"visible": false,key:"ASP"}
    promo_asp:CompareMetricModel = {"value" : [],"visible": false,key:"Promo ASP"}
    rsv_w_o_vat:CompareMetricModel = {"value" : [],"visible": false,key:"RSV w/o VAT"}
    customer_margin:CompareMetricModel = {"value" : [],"visible": false,key:"Trade Margin"}
    rp_percent:CompareMetricModel = {"value" : [],"visible": false,key:"Trade Margin,%RSV"}
    all_metrics:Array<CompareMetricModel> = [this.base_units , this.units,this.increment_units , this.volume,
    this.nsv , this.lsv,this.mac , this.mac_per_nsv , this.promo_asp,this.te,this.te_per_lsv,this.te_per_unit,
    this.roi,this.lift,this.asp,this.rsv_w_o_vat,this.customer_margin,this.rp_percent

]
    // sales_metric:Array<CompareMetricModel> = [this.units_compare]

    // this.asp.push(this._generate_obj(element , "asp"))
    //             this.promo_asp.push(this._generate_obj(element , "asp"))
    //             this.rsv_w_o_vat.push(this._generate_obj(element , "total_rsv_w_o_vat"))
    //             this.customer_margin.push(this._generate_obj(element , "rp"))
    //             this.rp_percent
    constructor(private elRef: ElementRef,private modal : ModalService ,) {}

    public kpiTableWidth: any;
    public kpiTableHeight: any;

    ngOnInit(): void {
        this.kpiTableWidth = window.innerWidth - 155;
        this.kpiTableHeight = window.innerHeight - 250;
        console.log(this.loaded_scenario , "loaded scenario data in kpy metic child component")
        // this.generate_metrics(this.loaded_scenario)

        // this.loaded_scenario[0].base.weekly[0].predicted_units
        // this.loaded_scenario[0].base.weekly[0].incremental_unit
        // this.loaded_scenario[0].base.weekly[0].base_unit
        // debugger
    }
    removeMetrics(id){
        this.scenario_names = this.scenario_names.filter(val=>val.id!=id)
        this.all_metrics.forEach(data=>{
            data.value = data.value.filter(d=>d.id!=id)
        }

        )
        
    }
    removeCompareEvent($event){
        this.removeMetrics($event.id)
        // this.loaded_scenario = this.loaded_scenario.filter(data=>data.scenario_id != $event.id)
        this.deleteCompareEvent.emit($event)
        // console.log($event)
        
    }
    openModal(){
        this.modal.open('manage-metrics')
    }

    toggleAbsolute(type:string){
        if(type == "abs"){
this.abs_selected = "selected"
this.per_selected = "unselected"
this.format = "absolute"
        }
        else{
            this.per_selected = "selected"
this.abs_selected = "unselected"
this.format = "percent"
            
        }

    }

    _generate_obj(element:LoadedScenarioModel , key:keyof PromoSimulatedTotalModel,per:boolean = false ,is_curr:boolean = true){
        let base = element.base.total[key]
                let simulated = element.simulated.total[key]
                let difference = simulated - base
                let percent = 0
                if(per){
                    percent =difference

                }
                else{
                    percent = (difference/base) * 100

                }
                


     let ret =  {
         "id" : element.scenario_id,
            "base" : base,
            "simulated" : simulated,
            "base_perton" : base,
            "simulated_perton" : simulated,
            "base_perunit" : base,
            "simulated_petunit" : simulated,
            "difference" : difference,
            "percent" : Utils.convertCurrency(percent , true),
            "converted_base" : Utils.convertCurrency(base , per,is_curr),
            "converted_simulated" : Utils.convertCurrency(simulated , per,is_curr),
            "converted_difference" : Utils.convertCurrency(difference,per,is_curr),
            "arrow" : difference < 0 ? "carret-down" : "carret-up",
            "color" : difference < 0 ? "red" : "green"

        }
        let rev_color = ["te","te_percent_of_lsv","te_per_unit"]
        if(rev_color.includes(key)){
            ret["color"] =  difference > 0 ? "red" : "green"
        }
        return ret
        // this.te.value.push(this._generate_obj(element , "te"))
        // this.te.visible = true
        // this.te_per_lsv.value.push(this._generate_obj(element , "te_percent_of_lsv", true))
        // this.te_per_lsv.visible = true
        // this.te_per_unit.value.push(this._generate_obj(element , "te_per_unit"))

    }
    metricChanges(e:Array<string>){
        // console.log(this.all_metrics , "all metrics")
        this.all_metrics.forEach(element=>{
             if(e.includes(element.key as string)){
                 element.visible = true

             }
             else{
                 element.visible = false
             }
        })

        // console.log(e , "selected metrics in kpi compoannt")
        
    }
    selectionChanged($event:any){
        if($event.value._id == "perton"){
            [this.mac , this.rsv_w_o_vat,this.customer_margin , this.lsv , this.te , this.nsv].forEach(data=>{
               data.value.forEach(val=>{
                   let vol = this.volume.value.find(v=>v.id == val.id)
                
                      val.base_perton = val.base/vol.base
                      val.simulated_perton = val.simulated/vol.simulated
                      val.difference = val.simulated_perton - val.base_perton,
                      val.percent = Utils.convertCurrency((val.difference/val.base_perton)*100,true ),
                      val.converted_base = Utils.convertCurrency(val.base_perton ),
                      val.converted_simulated = Utils.convertCurrency(val.simulated_perton),
                      val.converted_difference = Utils.convertCurrency(val.difference)
               }) 

            })
            
        }
        else if($event.value._id == "perunit"){
            [this.mac , this.rsv_w_o_vat,this.customer_margin , this.lsv , this.te , this.nsv].forEach(data=>{
               data.value.forEach(val=>{
                   let vol = this.units.value.find(v=>v.id == val.id)
                
                      val.base_perunit = val.base/vol.base
                      val.simulated_perunit = val.simulated/vol.simulated
                      val.difference = val.simulated_perunit - val.base_perunit,
                      val.percent = Utils.convertCurrency((val.difference/val.base_perunit)*100,true ),
                      val.converted_base = Utils.convertCurrency(val.base_perunit ),
                      val.converted_simulated = Utils.convertCurrency(val.simulated_perunit),
                      val.converted_difference = Utils.convertCurrency(val.difference)
               }) 

            })
            
        }
        else{
            [this.mac , this.rsv_w_o_vat,this.customer_margin , this.lsv , this.te , this.nsv].forEach(data=>{
                data.value.forEach(val=>{
                    val.difference = val.simulated - val.base,
                    val.percent = Utils.convertCurrency((val.difference/val.base)*100,true ),
                    val.converted_base = Utils.convertCurrency(val.base),
                       val.converted_simulated = Utils.convertCurrency(val.simulated),
                       val.converted_difference = Utils.convertCurrency(val.difference)
                }) 
 
             })
             

        }
        
    }
    generate_metrics(loaded_scenario : Array<LoadedScenarioModel>){
        // this.scenario_names = []
         
        loaded_scenario.forEach(element => {
            if(this.scenario_names.find(d=>d.id == element.scenario_id)){
                return
            }

            let ele = {
                "id" : element.scenario_id,
                "name" : element.scenario_name,
                "comment" : element.scenario_comment,
                "retailer" : {
                    "account_name" : element.account_name,
                    "product_group" : element.product_group
                }
            }
            this.scenario_names.push(ele)
                // this.base_units.push(this._generate_obj(element , "base_units"))
                // this.units.push(this._generate_obj(element , "units"))
                
                this.units.value.push(this._generate_obj(element , "units", false,false))
                this.units.visible = true
                this.base_units.value.push(this._generate_obj(element , "base_units",false,false))
                this.base_units.visible = true
                this.increment_units.value.push(this._generate_obj(element , "increment_units",false,false))
                this.increment_units.visible = true
                this.volume.value.push(this._generate_obj(element , "volume",false,false))
                this.volume.visible = true
                this.lsv.value.push(this._generate_obj(element , "lsv"))
                this.lsv.visible = true
                this.nsv.value.push(this._generate_obj(element , "nsv"))
                this.nsv.visible = true
                this.mac.value.push(this._generate_obj(element , "mac"))
                this.mac.visible = true
                this.mac_per_nsv.value.push(this._generate_obj(element , "mac_percent", true))
                this.mac_per_nsv.visible = true
                this.te.value.push(this._generate_obj(element , "te"))
                this.te.visible = true
                this.te_per_lsv.value.push(this._generate_obj(element , "te_percent_of_lsv", true))
                this.te_per_lsv.visible = true
                this.te_per_unit.value.push(this._generate_obj(element , "te_per_unit"))
                this.te_per_unit.visible = true
                this.roi.value.push(this._generate_obj(element , "roi", true))
                this.roi.visible = true
                this.lift.value.push(this._generate_obj(element , "lift", true))
                this.lift.visible = true
                this.asp.value.push(this._generate_obj(element , "asp"))
                this.asp.visible = true
                this.promo_asp.value.push(this._generate_obj(element , "avg_promo_selling_price"))
                this.promo_asp.visible = true
                this.rsv_w_o_vat.value.push(this._generate_obj(element , "total_rsv_w_o_vat"))
                this.rsv_w_o_vat.visible = true
                this.customer_margin.value.push(this._generate_obj(element , "rp"))
                this.customer_margin.visible = true
                this.rp_percent.value.push(this._generate_obj(element , "rp_percent", true))
                this.rp_percent.visible = true
                
                
                
                
                
                
                // this.units_compare = {"value" : this.units , "visible" : true}

                // this.increment_units.push(this._generate_obj(element , "increment_units"))
                // this.volume.push(this._generate_obj(element , "volume"))
                // this.lsv.push(this._generate_obj(element , "lsv"))
                // this.nsv.push(this._generate_obj(element , "nsv"))
                // this.mac.push(this._generate_obj(element , "mac"))
                // this.mac_per_nsv.push(this._generate_obj(element , "mac_percent" , true))
                // this.te.push(this._generate_obj(element , "te"))
                // this.te_per_lsv.push(this._generate_obj(element , "te_percent_of_lsv", true))
                // this.te_per_unit.push(this._generate_obj(element , "te_per_unit"))
                // this.roi.push(this._generate_obj(element , "roi", true))
                // this.lift.push(this._generate_obj(element , "lift", true))
                // this.asp.push(this._generate_obj(element , "asp"))
                // this.promo_asp.push(this._generate_obj(element , "asp"))
                // this.rsv_w_o_vat.push(this._generate_obj(element , "total_rsv_w_o_vat"))
                // this.customer_margin.push(this._generate_obj(element , "rp"))
                // this.rp_percent.push(this._generate_obj(element , "rp_percent", true))

                // lsv:Array<any> = []
                // nsv:Array<any> = []
                // mac : Array<any> = []
                // mac_per_nsv:Array<any> = []
                // te : Array<any> = []
                // te_per_lsv:Array<any> = []
                // te_per_unit:Array<any> = []
                // roi:Array<any> = []
                // lift:Array<any> = []
            
            
           
            
        });
        // console.log(this.scenario_names , "genrated base value scenario_names")
        // console.log(this.base_units , "genrated base value base")
        // console.log(this.units , "genrated base value units")
        // console.log(this.increment_units , "genrated base value inc")
        // console.log(this.volume , "genrated base value volume")
        // setTimeout(()=>{
        //     this.units_compare = {"value" : this.units , "visible" : true}
        //     console.log("setting")
        // },10000)

    }

    @ViewChild('kpiTableScroll', { static: false }) kpiTableScroll: any;
    scrolling_table: any;

    ngAfterViewInit() {
      
        // this.slider = this.elRef.nativeElement.querySelector('.slide');
        this.scrolling_table = this.elRef.nativeElement.querySelector('.kpiTableScroll');
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
    singleSelect: any = '';
    config = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        search: false,
    };
    totalValue = [
        {
            _id: 'totalvalue',
            index: 0,
            name: 'Total value',
        },
        {
            _id: 'perton',
            index: 1,
            name: 'Per ton',
        },
        {
            _id: 'perunit',
            index: 1,
            name: 'Per unit',
        },
    ];
    optionMetrics = [
        {
            _id: 'totalvalue',
            index: 0,
            name: 'Total value',
        },
        {
            _id: 'perton',
            index: 1,
            name: 'Per ton',
        },
        {
            _id: 'oerunit',
            index: 1,
            name: 'Per unit',
        },
    ];
    ngOnChanges(changes: SimpleChanges) {
 
        for (let property in changes) {
            if (property === 'loaded_scenario') {
                
                this.loaded_scenario = changes[property].currentValue
                // console.log(this.loaded_scenario , "after delete loaded scenario")
                this.generate_metrics(this.loaded_scenario)
               
            } 
        }
    }
}
