import { Component, OnInit } from '@angular/core';

import { ModalService } from '@molecules/modal/modal.service';
import { CheckboxModel,ListPromotion,Product,FilterModel } from "../../core/models"
// import {OptimizerService} from '../../core/services/optimizer.service'
import {SimulatorService,OptimizerService} from "@core/services"
import * as $ from 'jquery';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'nwn-promo-optimizer',
    templateUrl: './promo-optimizer.component.html',
    styleUrls: ['./promo-optimizer.component.css'],
})

export class PromoOptimizerComponent implements OnInit {
    scenarioTitle:any = 'Untitled'
    status: any = 'viewmore' 
    isOptimiserFilterApplied: boolean = false
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
    save_scenario_error:any = null
    optimizer_response : any = null
    disable_save_download = true

    filter_model : FilterModel = {"retailer" : "Retailers" , "brand" : 'Brands' , "brand_format" : 'Brand Formats' ,
    "category" : 'Category' , "product_group" : 'Product groups' , "strategic_cell" :  'Strategic cells'}
    product:Product[] = []
    loadScenarioPopuptitle:any = 'Load scenario'
    constructor(private toastr: ToastrService,private modalService: ModalService,private optimize : OptimizerService,private restApi: SimulatorService) {

    }

    ngOnInit(): void {
        this.scenarioTitle = "Untitled"
        this.restApi.setIsSaveScenarioLoadedObservable(null)
        this.optimize.fetchVal().subscribe(data=>{
            this.product = data
            this._populateFilters(this.product)

          },error=>{
              
            console.log(error , "error")
            throw error
          })
          this.restApi.getSignoutPopupObservable().subscribe(data=>{
            if(data != ''){
                if(data.type == 'optimizer'){
                    this.loadScenarioPopuptitle = 'My scenario'
                    this.openModal(data.id)
                }
            }
        })
    }

    _reset_checkbox(checkboxArray : CheckboxModel[]){
        checkboxArray.filter(d=>{
            if(d.checked){
                d.checked = false
            }
        })

    }

    filterResetEvent($event){
        if($event == 'Retailers'){
            this.filter_model.retailer = $event
            this._reset_checkbox(this.retailers)
            this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));
            this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (e===this.selected_product)}));
            this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
            this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
            this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));
        }
        else if($event == 'Category'){
            this.filter_model.category = $event
            this._reset_checkbox(this.categories)
            this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
            this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" :  (e===this.selected_product)}));
            this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
            this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
            this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));
        }
        else if($event == 'Brands'){
            this.filter_model.brand = $event
            this._reset_checkbox(this.brands)
            this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
            this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (e===this.selected_product)}));
            this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
            this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
            this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));
        }
        else if($event == 'Brand Formats'){
            this.filter_model.brand_format = $event
            this._reset_checkbox(this.brands_format)
            this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
            this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (e===this.selected_product)}));
            this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
            this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));
            this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));
        }
        else if($event == 'Product groups'){
            this.filter_model.product_group = $event
            this._reset_checkbox(this.product_group)
            this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
            this.brands  = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));
            this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
            this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
            this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));
        }
        else if($event == 'Strategic cells'){
            this.filter_model.strategic_cell = $event
            this._reset_checkbox(this.strategic_cell)
            this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));
            this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (e===this.selected_product)}));
            this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
            this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
            this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));
        }
    }

    downloadEvent($event){
        console.log($event)
        let form = {
        "account_name" : this.selected_retailer,
        "product_group" : this.selected_product,
        "optimizer_data" : {}
        }

        this.optimize.getOptimizerResponseObservabe().subscribe((data)=>{
            form.optimizer_data = data
        })

        this.optimize.downloadOptimiserExcel(form).subscribe(data=>{
            this.toastr.success('File Downloaded Successfully', 'Success')
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            FileSaver.saveAs(
                blob,
                'Optimizer' + '_export_' + new Date().getTime() + 'xlsx'
              );
        },(err:any)=>{
            this.toastr.warning('File Downloaded Unsuccessfully', 'Failed')
        })
    }
    filterApply(event){
        console.log(event,"after apply")
        if(event.key != undefined){
            if(event.key == 'Retailer'){
                this.filter_model.retailer = this.selected_retailer
            }
            else if(event.key == 'Category'){
                this.filter_model.category = this.selected_category
            }
            else if(event.key == 'Strategic cells'){
                this.filter_model.strategic_cell = this.selected_strategic_cell
            }
            else if(event.key == 'Brands'){
                this.filter_model.brand = this.selected_brand
            }
            else if(event.key == 'Brand Formats'){
                this.filter_model.brand_format = this.selected_brand_format
            }
            else if(event.key == 'Product groups'){
                this.filter_model.product_group = this.selected_product
            }
        }
    }

    _populateFilters(products : Product[]){
       this.retailers = [...new Set(products.map(item => item.account_name))].map(e=>({"value" : e,"checked" : false}));
       this.categories = [...new Set(products.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : false}));;
       this.strategic_cell = [...new Set(products.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : false}));;
       this.brands_format = [...new Set(products.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : false}));;
       this.brands = [...new Set(products.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : false}));;
       this.product_group = [...new Set(products.map(item => item.product_group))].map(e=>({"value" : e,"checked" : false}));;
    }

    retailerChange(event:CheckboxModel){
       
        this.retailers.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
        if(event.checked){
            this.selected_retailer = event.value
            // this.filter_model.retailer = this.selected_retailer
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
            // this.filter_model.category = this.selected_category

        }
        this.strategic_cell = [...new Set(this.product.filter(val=>val.corporate_segment == event.value).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
        this.product_group = [...new Set(this.product.filter(val=>val.corporate_segment == event.value).map(item => item.product_group))].map(e=>({"value" : e,"checked" :  (e===this.selected_product)}));
        this.retailers = [...new Set(this.product.filter(val=>val.corporate_segment == event.value).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
        this.brands_format = [...new Set(this.product.filter(val=>val.corporate_segment == event.value).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
        this.brands = [...new Set(this.product.filter(val=>val.corporate_segment == event.value).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));

    }

    strategicCellChange(event:CheckboxModel){
        this.strategic_cell.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
        if(event.checked){
            this.selected_strategic_cell = event.value
            this.strategic_cell.filter(val=>val.value == event.value).forEach(val=>val.checked = true)
            // this.filter_model.strategic_cell = this.selected_strategic_cell
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
            // this.filter_model.brand = this.selected_brand
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
            // this.filter_model.brand_format = this.selected_brand_format
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
            // this.filter_model.product_group = this.selected_product
        }
        this.strategic_cell = [...new Set(this.product.filter(val=>val.product_group == event.value).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
        this.brands = [...new Set(this.product.filter(val=>val.product_group == event.value).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));
        this.retailers = [...new Set(this.product.filter(val=>val.product_group == event.value).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
        this.brands_format = [...new Set(this.product.filter(val=>val.product_group == event.value).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
        this.categories = [...new Set(this.product.filter(val=>val.product_group == event.value).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));
    }
    openModal(id: string) {
        console.log(id)
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }
    closeModalEvent($event){
        this.closeModal($event)
    }
    loadOptimizer($event){
        this.isOptimiserFilterApplied = false
        this.filter_model["retailer"] =  $event['meta']['retailer']
        this.filter_model["product_group"] =  $event['meta']['product_group']
        this.productChange({"value" : $event['meta']['product_group'] , "checked" : true})
            this.retailerChange({"value" : $event['meta']['retailer'] , "checked" : true})
        // this.selected_product = $event['meta']['product_group']
        // this.selected_retailer = 
        // console.log($event , "load event")
        this.optimize.setAccAndPPGFilteredFlagObservable(true)
        this.optimize.fetch_optimizer_scenario_by_id($event["id"]).subscribe(data=>{
            if(data){
                console.log(data , "fetch response ..")
                // this.optimizer_response = data
                let promotion = this.optimize.getPromotionById($event["id"])
                data["meta"] = promotion
                console.log(data , "data with promotion details")
                this.optimize.setoptimizerDataObservable(data)
                this.restApi.setIsSaveScenarioLoadedObservable({"flag" : true , "data" : {
                    "name" : data.meta.name,
                    "comments" : data.meta.comments,
                    "id" : data.meta.id,
                    "type" : data.meta.scenario_type
    
                }})
                // this.isOptimiserFilterApplied = true

            }
           

        },err=>{
            console.log(err , "errror")
        })
        console.table($event)
    }
    optimizeAndReset($event){
        console.log($event , "optimize and reset event")
        if($event.type == 'optimize'){
            if(!$event['data']['objective_function']){
                this.toastr.error('Set Objective function to optimize ');
                return
            }
            if($event['data']['mars_tpr'].length == 0){
                this.toastr.error('Please select atleast one promotion');
                return
    
            }
            let res = {...this.get_optimizer_form(),...$event['data']}
            this.optimize.optimizeResult(res).subscribe(data=>{
                console.log(data , "optimizer response ")
                this.toastr.success('Optimized Successfully','Success')
                this.optimizer_response = data
                this.optimize.setOptimizerResponseObservable(data)
                this.optimize.setAccAndPPGFilteredFlagObservable(true)
                this.isOptimiserFilterApplied = true
                this.disable_save_download = false
            })
        }
        if($event.type == "reset"){
            console.log("resetting")
            this.selected_brand = null as any
        this.selected_brand_format = null as any
        this.selected_category= null as any
        this.selected_product= null as any
        this.selected_product= null as any
        this._populateFilters(this.product)

            this.status = "viewless"
            this.optimize.setoptimizerDataObservable(null as any) 

            this.optimizer_response = null
            this.optimize.setOptimizerResponseObservable(null)
            this.scenarioTitle = "Untitled"
            this.restApi.setIsSaveScenarioLoadedObservable(null)
            this.optimize.setAccAndPPGFilteredFlagObservable(false)
            this.isOptimiserFilterApplied = false
            this.filter_model =  {"retailer" : "Retailers" , "brand" : 'Brands' , "brand_format" : 'Brand Formats' ,
            "category" : 'Category' , "product_group" : 'Product groups' , "strategic_cell" :  'Strategic cells'}
            // pass
        }
    }
    saveScenario($event){
        let p:Product = this.product.find(d=>(d.account_name == this.selected_retailer && d.product_group == this.selected_product))!
        let data_response = this.optimizer_response.optimal
        console.log(data_response , "data response")
        let data;
        let keys_to_keep = ["Optimum_Promo" , "Coinvestment" , "week","Mechanic"]

        data=data_response.map(element => Object.assign({}, ...keys_to_keep.map(key => ({[key]: element[key]}))))
        let obj = {
            "type" : 'optimizer',
            "meta_id" : p?.id,
        // "account_name" : this.selected_category,
        // "product_group" : this.product_group , 
        "name" : $event['name'],
        "comments" : $event["comments"],
        'optimizer_data' : data

        
        }
        this.optimize.saveOptimizerScenario(obj).subscribe(data=>{
            this.closeModal("save-scenario-popup")
            console.log(data , "saved data")
            let promotion : ListPromotion = {
                "id" : data["message"],
                "name" :$event['name'],
                "comments" :  $event["comments"],
                "scenario_type" : "optimizer",
                "meta" : {
                    "retailer" : p?.account_name,
                    "product_group" : p?.product_group,
                    "pricing" : false
                }
            }
            this.toastr.success('Scenario Saved Successfully','Success')
            this.optimize.addPromotionList(promotion)
            this.scenarioTitle = promotion
            this.restApi.setIsSaveScenarioLoadedObservable({"flag" : true , "data" : {
                "name" : $event['name'],
                "comments" :  $event["comments"],
                "id" : data["message"],
                "type" :  "optimizer"

            }})

        },error=>{
            console.log(error , "error")
            this.save_scenario_error = error.detail

        })

        console.log(data , "save scenario event")


    }
    receiveMessage($event: any) {
        console.log('recieved');
        if($event == 'Optimize'){
            this.optimize.optimizeResult(this.get_optimizer_form()).subscribe(data=>{
                this.optimize.setOptimizerResponseObservable(data)
                this.isOptimiserFilterApplied = true
               
            })
           
        
        }
        else if($event == 'OptimizerFilterReset'){
            this.isOptimiserFilterApplied = false
        }
        else{
            if($event == 'load-scenario-promosimulator'){
                this.loadScenarioPopuptitle = 'Load scenario'
            }
            this.openModal($event);
        }
    }
    // _tranform_corporate_segement(corporate_segment){
    //     if(corporate_segment.toLowerCase() == 'gum'){
    //         return "Gum"

    //     }
    //     else{
    //         return "Choco"

    //     }

    // }
    get_optimizer_form(){
        console.log(this.selected_retailer , "retailer selected")
        console.log(this.selected_product , "product selected")
        let product = this.product.find(d=>(d.product_group == this.selected_product && d.account_name == this.selected_retailer))
        
        let obj = {
            "account_name" :product?.account_name,
            "brand":product?.brand_filter,
            "brand_format" : product?.brand_format_filter,
            "corporate_segment":product?.corporate_segment,
            "strategic_cell" : product?.strategic_cell_filter,
            "product_group" : product?.product_group,
            "objective_function" : "MAC",
            "mars_tpr" : "",
            "co_investment" : 0,
            "config_gsv": false,
            "config_mac": false,
            "config_mac_perc": false,
            "config_max_consecutive_promo": true,
            "config_min_consecutive_promo": true,
            "config_nsv": false,
            "config_promo_gap": true,
            "config_rp": false,
            "config_rp_perc": false,
            "config_sales": false,
            "config_trade_expense": false,
            "config_units": false,
            "param_gsv": 0,
            "param_mac": 0,
            "param_mac_perc": 0,
            "param_max_consecutive_promo": 0,
            "param_min_consecutive_promo": 0,
            "param_nsv": 0,
            "param_promo_gap": 0,
            "param_rp": 0,
            "param_rp_perc": 0,
            "param_sales": 0,
            "param_trade_expense": 0,
            "param_units": 0,
            "param_no_of_waves":0,
            "param_no_of_promo" : 0,
            "param_total_promo_min" : 0,
            "param_total_promo_max" : 0
        }
        return obj
    }

    reset(){
        this.filter_model =  {"retailer" : "Retailers" , "brand" : 'Brands' , "brand_format" : 'Brand Formats' ,
        "category" : 'Category' , "product_group" : 'Product groups' , "strategic_cell" :  'Strategic cells'}
    }

    close($event){
        
        if($event=="filter-product-groups"){
            if(!this.selected_retailer || this.selected_retailer == "Retailers"){
                this.toastr.error("Set retailer to simulate")
                this.closeModal($event)
                return
            }
            if(!this.selected_product  || this.selected_product == "Product groups"){
                this.toastr.error("Set product to simulate")
                this.closeModal($event)
                return
            }
            let p = this.product.find(e=>(e.account_name == this.selected_retailer)&&(e.product_group==this.selected_product))
            this.optimize.setAccAndPPGFilteredFlagObservable(true)
            if(p){
                this.optimize.fetch_optimizer_data({
                    "account_name" : p.account_name,
                    "product_group" : p.product_group,
                    "corporate_segment" : p.corporate_segment
                }).subscribe(data=>{
                    console.log(data , "response")
                   this.optimize.setoptimizerDataObservable(data)
                },err=>{
                    this.toastr.warning(err.detail)
                    // console.log(err , "error")
                })
            }
        }
        this.closeModal($event)
    }
}
