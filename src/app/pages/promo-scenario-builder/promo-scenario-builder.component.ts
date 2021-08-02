/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';

import { ModalService } from '@molecules/modal/modal.service';
import {FormBuilder, FormGroup,FormArray,FormControl,ValidatorFn} from '@angular/forms';
import {OptimizerService} from '@core/services'
import {ProductWeek , Product, CheckboxModel,LoadedScenarioModel,UploadModel} from "@core/models"
import * as utils from "@core/utils"
// import {} from 'file-saver'
import * as FileSaver from 'file-saver';
// import weeklyPromotionStories from '@molecules/weekly-promotion/weekly-promotion.stories';
// import { ThisReceiver } from '@angular/compiler';
import { SimulatorService } from "@core/services";
import { tickStep } from 'd3';
import * as $ from 'jquery';
@Component({
    selector: 'nwn-promo-scenario-builder',
    templateUrl: './promo-scenario-builder.component.html',
    styleUrls: ['./promo-scenario-builder.component.css'],
})
export class PromoScenarioBuilderComponent implements OnInit {
    isFilterApplied: boolean = false
    hideFilter: string = 'yettobesimulated'
    form: FormGroup = null as any;
    product:Product[] = []
    product_week:ProductWeek[] = [];
    genobj : {[key:string] : any[]  } = {}
    quarter_year:Array<string> = [];
    selected_quarter:string = ''
    selected_product_week : ProductWeek[] = []
    retailers:Array<CheckboxModel> = []
    categories:Array<CheckboxModel> = [] 
    strategic_cell:Array<CheckboxModel> = []
    brands_format:Array<CheckboxModel> = []
    brands:Array<CheckboxModel> = []
    product_group:Array<CheckboxModel> = []
    selected_retailer:string = null as any
    selected_product:string = null as any
    selected_category:string = null as any
    selected_strategic_cell:string = null as any
    selected_brand:string = null as any
    selected_brand_format:string = null as any
    promotion_map:Array<any> = []
    loaded_scenario:LoadedScenarioModel = null as any
    scenario_comment=''
    scenario_name = ''
    uploaded_file:any = null

    get ordersFormArray() {
        return this.form.controls.orders as FormArray;
      }

    constructor(private modalService: ModalService,public restApi: SimulatorService,
        private optimize : OptimizerService,private formBuilder: FormBuilder) {

            this.form = this.formBuilder.group({
                orders: new FormArray([])
              });
        }
    

    ngOnInit() {
        // this.restApi.uploadedSimulatorDataObservable.asObservable().subscribe(data=>{
        //     if(data != ''){
        //         console.log(data,"observable data")
        //         this.isFilterApplied = true
        //         this.hideFilter = 'viewless'
        //         this.closeModal('upload-weekly-promotions')
        //     }
        // })
        var self = this;
        $(document).keydown(function(event) { 
            if (event.keyCode == 27) {
                var modal_id = self.modalService.opened_modal
                if(modal_id.length > 0){
                    modal_id = modal_id[modal_id.length-1]
                    $('#'+modal_id).hide(); 
                    self.modalService.remove_last_modal()
                }
            }
        });
        this.optimize.fetchVal().subscribe(data=>{
            this.product = data
            this._populateFilters(this.product)

          },error=>{
            console.log(error , "error")
          })
      
    }
    retailerChange(event:CheckboxModel){
       
        this.retailers.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
        if(event.checked){
            this.selected_retailer = event.value
            this.retailers.filter(val=>val.value == event.value).forEach(val=>val.checked = true)

        }
        this.categories = [...new Set(this.product.filter(val=>val.account_name == event.value).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));
        this.product_group = [...new Set(this.product.filter(val=>val.account_name == event.value).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (e===this.selected_product)}));
        this.strategic_cell = [...new Set(this.product.filter(val=>val.account_name == event.value).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
        this.brands_format = [...new Set(this.product.filter(val=>val.account_name == event.value).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
        this.brands = [...new Set(this.product.filter(val=>val.account_name == event.value).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));
       
    }
    categoryChange(event:CheckboxModel){
        console.log(event)
        console.log(this.selected_retailer , "selected reatilser")
        this.categories.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
        if(event.checked){

            this.categories.filter(val=>val.value == event.value).forEach(val=>val.checked = true)
            this.selected_category = event.value

        }
        this.strategic_cell = [...new Set(this.product.filter(val=>val.corporate_segment == event.value).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
        this.product_group = [...new Set(this.product.filter(val=>val.corporate_segment == event.value).map(item => item.product_group))].map(e=>({"value" : e,"checked" :  (e===this.selected_product)}));
        this.retailers = [...new Set(this.product.filter(val=>val.corporate_segment == event.value).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
        this.brands_format = [...new Set(this.product.filter(val=>val.corporate_segment == event.value).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
        this.brands = [...new Set(this.product.filter(val=>val.corporate_segment == event.value).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));
// debugger

    }

    strategicCellChange(event:CheckboxModel){
        this.strategic_cell.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
        if(event.checked){
            this.selected_strategic_cell = event.value
            this.strategic_cell.filter(val=>val.value == event.value).forEach(val=>val.checked = true)

        }
        this.categories = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));
        this.product_group = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (e===this.selected_product)}));
        this.retailers = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
        this.brands_format = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
        this.brands = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));

    }
        brandChange(event:CheckboxModel){
        this.brands.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
        if(event.checked){
            this.selected_brand = event.value
            this.brands.filter(val=>val.value == event.value).forEach(val=>val.checked = true)

        }
        this.strategic_cell = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
        this.product_group = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (e===this.selected_product)}));
        this.retailers = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
        this.brands_format = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
        this.categories = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));


    }
    brandFormatChange(event:CheckboxModel){
        this.brands_format.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
        if(event.checked){
            this.selected_brand_format = event.value
            this.brands_format.filter(val=>val.value == event.value).forEach(val=>val.checked = true)

        }
        this.strategic_cell = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
        this.product_group = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (e===this.selected_product)}));
        this.retailers = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
        this.brands = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));
        this.categories = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));


    }
    productChange(event:CheckboxModel){
        this.product_group.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
        if(event.checked){
            this.selected_product = event.value
            this.product_group.filter(val=>val.value == event.value).forEach(val=>val.checked = true)

        }
        this.strategic_cell = [...new Set(this.product.filter(val=>val.product_group == event.value).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
        this.brands = [...new Set(this.product.filter(val=>val.product_group == event.value).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));
        this.retailers = [...new Set(this.product.filter(val=>val.product_group == event.value).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
        this.brands_format = [...new Set(this.product.filter(val=>val.product_group == event.value).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
        this.categories = [...new Set(this.product.filter(val=>val.product_group == event.value).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));


    }
    _populateFilters(products : Product[]){
        // debugger
       this.retailers = [...new Set(products.map(item => item.account_name))].map(e=>({"value" : e,"checked" : false}));
       this.categories = [...new Set(products.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : false}));;
       this.strategic_cell = [...new Set(products.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : false}));;
       this.brands_format = [...new Set(products.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : false}));;
       this.brands = [...new Set(products.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : false}));;
       this.product_group = [...new Set(products.map(item => item.product_group))].map(e=>({"value" : e,"checked" : false}));;
        
    // this.retailers.forEach(() => this.ordersFormArray.push(new FormControl(false)));
      

    }

    openModal(id: string) {
        this.modalService.open(id);
    }
   

    closeModal(id: string) {
        this.modalService.close(id);
    }
    close($event){
        if($event=="filter-product-groups"){
            let p = this.product.find(e=>(e.account_name == this.selected_retailer)&&(e.product_group==this.selected_product))
            if(p){
                this.optimize.fetch_week_value(p.id)
            }
           
        }
        if($event=="upload-weekly-promotions"){
            this.uploadFile()

        }
        this.closeModal($event)
        // console.log($event)

    }
    reset(){
        this.promotion_map = []
        this.selected_brand = null as any
        this.selected_brand_format = null as any
        this.selected_category= null as any
        this.selected_product= null as any
        this.selected_product= null as any
        this._populateFilters(this.product)
        this.optimize.setProductWeekObservable([])
        // this.selected_product_week
        // t
    }
    simulateResetEvent($event){
        console.log($event , "event passed")
        this.promotion_map = $event.promotion_map
        let form = {
            "account_name" : this.selected_retailer ,
             "corporate_segment" : this.selected_category,
            "product_group" : this.selected_product,
        "param_depth_all" : false,
    "promo_elasticity" : $event.promo_elasticity}
        console.log($event.promotion_map , "promotion maps available")
    
        $event.promotion_map.forEach(element => {
            let key = "week-" + element.week.week
            // var thenum = thestring.replace(/[^0-9]/g,'')
            // debugger
            let obj = utils.decodePromotion(element.selected_promotion)
            // {
            //     "promo_depth":parseInt(element.selected_promotion.replace(/[^0-9]/g,'')),
            //     "promo_mechanics":"",
            //     "co_investment":parseInt(element.week.co_investment)
            // }
            form[key] = obj
            
        });
        if($event.action == 'Reset'){
            this.isFilterApplied = false
            this.hideFilter = 'yettobesimulated'
            this.reset()
        }
        
        console.log(form , "form data")
        // debugger
        this.optimize.getPromoSimulateData(form).subscribe(data=>{
           this.optimize.setSimulatedDataObservable(data)
           if($event.action == 'Simulate'){
            this.isFilterApplied = true
            this.hideFilter = 'viewmore'
            // this.hideFilter = 'yettobesimulated'
        }
       
        })
       
    }
    downloadEvent($event){
        let form = {
            "account_name" : this.selected_retailer ,
             "corporate_segment" : this.selected_category,
            "product_group" : this.selected_product,
        "param_depth_all" : false,
    "promo_elasticity" : 0}
    this.promotion_map.forEach(element => {
        let key = "week-" + element.week.week
        let obj = {
            "promo_depth":parseInt(element.selected_promotion.replace(/[^0-9]/g,'')),
            "promo_mechanics":"",
            "co_investment":parseInt(element.week.co_investment)
        }
        form[key] = obj
        
        
    });
    this.optimize.downloadPromo(form).subscribe(data=>{
            
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            
        FileSaver.saveAs(
            blob,
            'promo' + '_export_' + new Date().getTime() + 'xlsx'
          );

         
        })
    

    }
    uploadFile(){
           this.restApi.uploadPromoSimulateInput(this.uploaded_file).subscribe((data: UploadModel) => {
               console.log(data , "data uploaded")
            this.productChange({"value" : data.simulated.product_group , "checked" : true})
            this.retailerChange({"value" : data.simulated.account_name , "checked" : true})
            //    this.optimize.setProductWeekObservable(data.base)
            this.optimize.setUploadedScanarioObservable(data)
            //    this.isFilterApplied = true
               this.hideFilter = 'viewmore'
            
            
           
        })
    }
    fileUpload($event){
        this.uploaded_file = $event
        
    }
    loadPromotionEvent($event){
        this.optimize.fetch_load_scenario_by_id($event.id).subscribe(data=>{
            this.loaded_scenario = data
            this.scenario_name = this.loaded_scenario.scenario_name
            this.scenario_comment = this.loaded_scenario.scenario_comment
            this.productChange({"value" : data.product_group , "checked" : true})
            this.retailerChange({"value" : data.corporate_segment , "checked" : true}) 
            this.optimize.setLoadedScenarioModel(this.loaded_scenario)  

            console.log(this.loaded_scenario , "loaded sceanrio")
        })
        console.log($event.id , "id of saved promotion")
    }
    
    populatePromotionMap(){
        // this.promotion_map.push({"selected_promotion":"TPR-"+val+"%","week" : data})
    }
    saveScenario($event){
        console.log($event , "save scenario event")
        let weekly = {
            "name" : $event['name'],
            "comments" : $event["comments"],
            "account_name" : this.selected_retailer ,
            "corporate_segment" : this.selected_category,
           "product_group" : this.selected_product,
       "param_depth_all" : false,
   "promo_elasticity" : 0
        }
        // debugger
        this.promotion_map.forEach(element => {
            let key = "week-" + element.week.week
            let obj = utils.decodePromotion(element.selected_promotion)
            // {
            //     "promo_depth":parseInt(element.selected_promotion.replace(/[^0-9]/g,'')),
            //     "promo_mechanics":"",
            //     "co_investment":parseInt(element.week.co_investment)
            // }
            weekly[key] = obj
            
        });
        
this.optimize.savePromoScenario(weekly).subscribe(data=>{
    console.log("saved data")
})
this.modalService.close("save-scenario-popup")
    // debugger
    }

    receiveMessage($event: any) {
        console.log('recieved');
        if($event == 'Simulate'){
            this.isFilterApplied = true
            this.hideFilter = 'viewmore'
        }
        else if($event == 'Reset'){
            this.isFilterApplied = false
            this.hideFilter = 'viewless'
        }
        else{
            this.openModal($event);
        }

    }


}
