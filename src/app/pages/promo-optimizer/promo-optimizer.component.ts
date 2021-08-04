import { Component, OnInit } from '@angular/core';

import { ModalService } from '@molecules/modal/modal.service';
import { CheckboxModel,Product } from "../../core/models"
import {OptimizerService} from '../../core/services/optimizer.service'
import * as $ from 'jquery';

@Component({
    selector: 'nwn-promo-optimizer',
    templateUrl: './promo-optimizer.component.html',
    styleUrls: ['./promo-optimizer.component.css'],
})

export class PromoOptimizerComponent implements OnInit {
    status: any = 'yettobesimulated' 
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

    product:Product[] = []
    constructor(private modalService: ModalService,private optimize : OptimizerService,) {

    }

    ngOnInit(): void {
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
    openModal(id: string) {
        console.log(id)
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
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
            this.openModal($event);
        }
    }
    get_optimizer_form(){
        let obj = {
            "account_name" : "Pyaterochka",
            "brand":"",
            "brand_format" : "",
            "corporate_segment":"GUM",
            "strategic_cell" : "",
            "product_group" : "Orbit OTC",
            "objective_function" : "MAC",
            "mars_tpr" : "",
            "co_investment" : 0,
            "config_gsv": false,
            "config_mac": false,
            "config_mac_perc": false,
            "config_max_consecutive_promo": false,
            "config_min_consecutive_promo": false,
            "config_nsv": false,
            "config_promo_gap": false,
            "config_rp": false,
            "config_rp_perc": false,
            "config_sales": false,
            "config_trade_expense": false,
            "config_units": false,
            "param_gsv": 5,
            "param_mac": 5,
            "param_mac_perc": 5,
            "param_max_consecutive_promo": 5,
            "param_min_consecutive_promo": 5,
            "param_nsv": 5,
            "param_promo_gap": 5,
            "param_rp": 5,
            "param_rp_perc": 5,
            "param_sales": 5,
            "param_trade_expense": 5,
            "param_units": 5,
            "param_no_of_waves":5,
            "param_no_of_promo" : 5
        }
        return obj
    }

    close($event){
        
        if($event=="filter-product-groups"){
            let p = this.product.find(e=>(e.account_name == this.selected_retailer)&&(e.product_group==this.selected_product))
            // debugger
            if(p){
                this.optimize.fetch_optimizer_data({
                    "account_name" : p.account_name,
                    "product_group" : p.product_group,
                    "corporate_segment" : p.corporate_segment
                }).subscribe(data=>{
                    console.log(data , "response")
                   this.optimize.setoptimizerDataObservable(data)
                })
            }
        }
        this.closeModal($event)
    }
}
