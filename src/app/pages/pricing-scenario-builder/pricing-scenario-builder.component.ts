import { Component, OnInit } from '@angular/core';

import { ModalService } from '@molecules/modal/modal.service';
import {OptimizerService,SimulatorService,PricingService} from '@core/services'
import { CheckboxModel, FilterModel, HierarchyCheckBoxModel, PricingModel, Product } from '@core/models';
import * as utils from "@core/utils"

@Component({
    selector: 'nwn-pricing-scenario-builder',
    templateUrl: './pricing-scenario-builder.component.html',
    styleUrls: ['./pricing-scenario-builder.component.css'],
})
export class PricingScenarioBuilderComponent implements OnInit {
    hidepanel = true
    product:Product[] = []
    filter_model : FilterModel = {"retailer" : "Retailers" , "brand" : 'Brands' , "brand_format" : 'Brand Formats' ,
    "category" : 'Category' , "product_group" : 'Product groups' , "strategic_cell" :  'Strategic cells'}
    selected_retailer:string[] = [] as any
    selected_product:string[] = [] as any
    selected_category:string[] = [] as any
    selected_strategic_cell:string[] = [] as any
    selected_brand:string[] = [] as any
    selected_brand_format:string[] = [] as any
    count_ret = {
        "retailers" : this.selected_retailer.length,
        "products" : this.selected_product.length
    }

    retailers:Array<CheckboxModel> = []
    categories:Array<CheckboxModel> = [] 
    strategic_cell:Array<CheckboxModel> = []
    brands_format:Array<CheckboxModel> = []
    brands:Array<CheckboxModel> = []
    product_group:Array<CheckboxModel> = []
    showtbas = false

    hierarchy_model : Array<HierarchyCheckBoxModel> = []
    
    pricingArray:PricingModel[] = []
    constructor(private modalService: ModalService,public restApi: SimulatorService,
        private optimize : OptimizerService,private pricing : PricingService) {}

    ngOnInit(): void {
        this.pricing.getPricingSimulatedObservable().subscribe(data=>{
            console.log("tabsdata " , data)
            if(data){
                this.showtbas = true

            }
            else{
                this.showtbas = false
            }
        })

        this.optimize.fetchVal().subscribe(data=>{
            if(data && data.length > 0){
                this.reset()
                this.product = data
                this._populateFilters(this.product)

            }
           

          },error=>{
            console.log(error , "error")
            throw error
          })
        //   let arr = [358,359,370,371]
       
    }
    // saveScenario($event){
    //     console.log($event , "save scenrio event")
    //     this.pricing
    // }
    _populateHierarchyModel(products : Product[]){
        if(products.length > 0){
            this.hierarchy_model.push({"value" : "All" , "checked" : false,"child" : []}) 
        }

        // this.hierarchy_model.push({"value" : "All" , "checked" : true,"child" : []})
        this.retailers.forEach(d=>{
            // debugger
            this.hierarchy_model.push({...d , ...{"child" : products.filter(p=>p.account_name == d.value).map(m=>({"value" : m.product_group , "checked" : false,"id" : m.id}))}})
            
            // debugger
            // this.hierarchy_model.push(d)
        })
        console.log(this.hierarchy_model , "hierarchy model......")

    }
    _populateFilters(products : Product[]){
        // debugger
       this.retailers = [...new Set(products.map(item => item.account_name))].map(e=>({"value" : e,"checked" : false}));
       this.categories = [...new Set(products.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : false}));;
       this.strategic_cell = [...new Set(products.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : false}));;
       this.brands_format = [...new Set(products.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : false}));;
       this.brands = [...new Set(products.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : false}));;
       this.product_group = [...new Set(products.map(item => item.product_group))].map(e=>({"value" : e,"checked" : false}));;
    //    debugger 
       this._populateHierarchyModel(products)
    // this.retailers.forEach(() => this.ordersFormArray.push(new FormControl(false)));
      

    }

    loadScenarioEvent($event){
        let ids = $event.meta.map(d=>this.product.filter(dd=>(dd.account_name == d.retailer && (dd.product_group == d.product_group)))[0]).map(d=>d.id)
        // debugger
        this.pricing.getPricingMetric(ids).subscribe(data=>{
            this.pricingArray = [...this.pricingArray , ...data]
            console.log(data , "pricin metics data...")
        })
    }
  
    reset(){
        
        this._populateFilters(this.product)
        this.optimize.setProductWeekObservable([])
        this.optimize.setLoadedScenarioModel(null as any)
        this.restApi.setIsSaveScenarioLoadedObservable(null)
        
        // this.filter_model =  {"retailer" : "Retailers" , "brand" : 'Brands' , "brand_format" : 'Brand Formats' ,
        // "category" : 'Category' , "product_group" : 'Product groups' , "strategic_cell" :  'Strategic cells'}
        
    }
    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }
    modalEvent($event){
        if($event['type'] == "open"){
            this.openModal($event['id'])

        }
        else{
            this.closeModal($event['id'])

        }

    }
    receiveMessage($event: any) {
        console.log($event , 'recieved');
        this.openModal($event);
    }
    retailerChange(event:CheckboxModel){
        console.log(event , "event checked")
        // this.retailers.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
        if(event.checked){
            
            // debugger
            this.selected_retailer = [...this.selected_retailer, event.value]
            // this.filter_model.retailer = this.selected_retailer
            // debugger
            // this.retailers = this.retailers.map(a => {
                
            //     var returnValue = {...a};
              
            //     if (a.value == event.value) {
            //         returnValue ={...a ,"checked" : true}
                
            //     }
              
            //     return returnValue
            //   })
            this.retailers.filter(val=>val.value == event.value).forEach(val=>val.checked = true)

            this.categories = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category.includes(e))}));
        this.product_group = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product.includes(e))}));
        this.strategic_cell = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
        this.brands_format = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
        this.brands = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand.includes(e))}));
        this.hierarchy_model.filter(d=>d.value == event.value)[0].checked = true
        
        }
        else{
            this.selected_retailer = this.selected_retailer.filter(e=>e!=event.value)

            this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category.includes(e))}));
        this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product.includes(e))}));
        this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
        this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
        this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand.includes(e))}));
        this.hierarchy_model.filter(d=>d.value == event.value)[0].checked = false

        }

        console.log(this.retailers , "retailers ")
        this.count_ret = {...this.count_ret ,...{"retailers" : this.selected_retailer.length}}
        
       
    }
    categoryChange(event:CheckboxModel){
        // console.log(event)
        // console.log(this.selected_retailer , "selected reatilser")
        // this.categories.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
        if(event.checked){
            this.selected_category =[...this.selected_category, event.value]
            // this.selected_retailer = [...this.selected_retailer, event.value]

            this.categories.filter(val=>val.value == event.value).forEach(val=>val.checked = true)
            
            // this.filter_model.category = this.selected_category
            this.strategic_cell = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
            this.product_group = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.product_group))].map(e=>({"value" : e,"checked" :  (this.selected_product.includes(e))}));
            this.retailers = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer.includes(e))}));
            this.brands_format = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
            this.brands = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand.includes(e))}));

        }
        else{
            this.selected_category = this.selected_category.filter(e=>e!=event.value)


            this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
            this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" :  (this.selected_product.includes(e))}));
            this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer.includes(e))}));
            this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
            this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand.includes(e))}));


        }
       
// debugger

    }

    strategicCellChange(event:CheckboxModel){
        // this.strategic_cell.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
        // if(event.checked){
        //     this.selected_strategic_cell = event.value
        //     this.strategic_cell.filter(val=>val.value == event.value).forEach(val=>val.checked = true)
        //     // this.filter_model.strategic_cell = this.selected_strategic_cell
        //     this.categories = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));
        //     this.product_group = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (e===this.selected_product)}));
        //     this.retailers = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
        //     this.brands_format = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
        //     this.brands = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));

        // }
        // else{
        //     this.selected_strategic_cell = 'Strategic cells'
        //     this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));
        //     this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (e===this.selected_product)}));
        //     this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
        //     this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
        //     this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));


        // }
       

    }
        brandChange(event:CheckboxModel){
        // this.brands.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
        // if(event.checked){
        //     this.selected_brand = event.value
        //     this.brands.filter(val=>val.value == event.value).forEach(val=>val.checked = true)
        //     // this.filter_model.brand = this.selected_brand

        //     this.strategic_cell = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
        //     this.product_group = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (e===this.selected_product)}));
        //     this.retailers = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
        //     this.brands_format = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
        //     this.categories = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));
    

        // }
        // else{
        //     this.selected_brand = 'Brands'
        //     this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
        //     this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (e===this.selected_product)}));
        //     this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
        //     this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand_format)}));
        //     this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));
    

        // }
       

    }
    brandFormatChange(event:CheckboxModel){
        // this.brands_format.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
        // if(event.checked){
        //     this.selected_brand_format = event.value
        //     this.brands_format.filter(val=>val.value == event.value).forEach(val=>val.checked = true)
        //     // this.filter_model.brand_format = this.selected_brand_format

        // this.strategic_cell = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
        // this.product_group = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (e===this.selected_product)}));
        // this.retailers = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
        // this.brands = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));
        // this.categories = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));


        // }
        // else{
        //     this.selected_brand_format = 'Brand Formats'
        //     this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_strategic_cell)}));
        //     this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (e===this.selected_product)}));
        //     this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (e===this.selected_retailer)}));
        //     this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (e===this.selected_brand)}));
        //     this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (e===this.selected_category)}));
    

        // }
        

    }
    productChange(event:CheckboxModel){
        // debugger
        // console.log(event , "product change")
        // this.product_group.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
        if(event.checked){
            this.selected_product = [...this.selected_product,event.value]
            this.product_group.filter(val=>val.value == event.value).forEach(val=>val.checked = true)
            // this.filter_model.product_group = this.selected_product

            this.strategic_cell = [...new Set(this.product.filter(val=>this.selected_product.includes(val.product_group)).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
            this.brands  = [...new Set(this.product.filter(val=>this.selected_product.includes(val.product_group)).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand.includes(e))}));
            this.retailers = [...new Set(this.product.filter(val=>this.selected_product.includes(val.product_group)).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer.includes(e))}));
            this.brands_format = [...new Set(this.product.filter(val=>this.selected_product.includes(val.product_group)).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
            this.categories = [...new Set(this.product.filter(val=>this.selected_product.includes(val.product_group)).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category.includes(e))}));
    

        }
        else{
            this.selected_product = this.selected_product.filter(e=>e!=event.value)
            this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
            this.brands  = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand.includes(e))}));
            this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer.includes(e))}));
            this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
            this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category.includes(e))}));
    

        }
        this.count_ret = {...this.count_ret ,...{"products" : this.selected_product.length}}
       

    }
    hierarchyProductChange(event){
        console.log(event , "event")
        if(event.value == "All"){
            if(event.checked){
                this.hierarchy_model.forEach(h=>{
                    h.checked = true
                    h.child.forEach(hc=>{
                        hc.checked = true
                    })
                })

            }
            else{
                this.hierarchy_model.forEach(h=>{
                    h.checked = false
                    h.child.forEach(hc=>{
                        hc.checked = false
                    })
                })
            }
            

        }
        
         
        else if('product' in event){  // product change
            this.productChange(event["product"])
            // debugger
            if(event.product.checked){
                this.hierarchy_model.filter(d=>d.value == event.retailer.value)[0].child.filter(d=>d.value == event.product.value)[0].checked = true

            }
            else{
                this.hierarchy_model.filter(d=>d.value == event.retailer.value)[0].child.filter(d=>d.value == event.product.value)[0].checked = false

            }

        }
        else{ //retailer change
            this.retailerChange(event)
            
            
        }

        
        
    }
    filterApply(event){
        
        console.log(this.hierarchy_model , "hierarchy model..")
        console.log(event,"after apply")
        if(event.key != undefined){
            // if(event.key == 'Retailer'){
            //     this.filter_model = {...this.filter_model , ...{"retailer" : this.selected_retailer}}
                 
            //     console.log(this.filter_model , "filter model")
            // }
            // else if(event.key == 'Category'){
            //     this.filter_model = {...this.filter_model , ...{"category" : this.selected_category}}
            // }
            // else if(event.key == 'Strategic cells'){
            //     this.filter_model = {...this.filter_model , ...{"strategic_cell" : this.selected_strategic_cell}}
                 
            // }
            // else if(event.key == 'Brands'){
            //     this.filter_model = {...this.filter_model , ...{"brand" : this.selected_brand}}
            // }
            // else if(event.key == 'Brand Formats'){
            //     this.filter_model = {...this.filter_model , ...{"brand_format" : this.selected_brand_format}}
                
            // }
            if(event.key == 'Product groups'){
                this.closeModal("addnew-pricngtool")
                console.log(this.hierarchy_model , "hierarchy model...")
                console.log(this.product , "availalbe product......")
                // let selected = this.product.filter(e=>
                //     (this.selected_retailer.includes(e.account_name)) &&
                //     (this.selected_product.includes(e.product_group))
                
                // ).map(d=>d.id)
                // debugger
                let selected = 
                 [].concat.apply([] , this.hierarchy_model.filter(d=>d.checked).map(d=>d.child.filter(d=>d.checked).map(d=>d.id)) as any[]);
                // this.hierarchy_model.filter(d=>d.checked).map(d=>d.child.filter(d=>d.checked).map(d=>d.id)).flat(1);
                console.log(selected , "selected product for api")
                // this.filter_model = {...this.filter_model , ...{"product_group" : this.selected_product}}

                // let arr = [358]
                this.pricing.getPricingMetric(selected).subscribe(data=>{
                    this.pricingArray = [...this.pricingArray , ...data]
                    console.log(data , "pricin metics data...")
                })
               
            }
        }
    }
    _filterPricingArray(obj , is_product){
       if(is_product){
        this.pricingArray = this.pricingArray.filter(d=>!(d.account_name == obj['retailer'] && d.product_group == obj["product"]))
        var idx = this.selected_product.findIndex(p =>p== obj["product"]);
        this.selected_product.splice(idx,1); 
        this.count_ret = {...this.count_ret ,...{"products" : this.selected_product.length}}

       }
       else{
        this.pricingArray = this.pricingArray.filter(d=>!(d.account_name == obj['retailer']))
        var idx = this.selected_retailer.findIndex(p =>p== obj["retailer"]);
        this.selected_retailer.splice(idx,1); 
        this.count_ret = {...this.count_ret ,...{"retailers" : this.selected_retailer.length}}

       }
      
        console.log(this.selected_product , "sel pr af")
    }
    simulateReset($event){
      
        if($event.type == 'simulate'){
            // console.log(this.pricingArray.map(d=>d.tpr_discount = 0) , "disounts..")
            
            let form = {...$event.data}
            console.log(form, "simulate from data...")
            let retailers:any = []
            form.products.forEach(element => {
               retailers.push({"account_name" : element.account_name , "product_group" : element.product_group})
                element.list_price_date = utils.convertMomentToDate(element.list_price_date)
                element.rsp_date = utils.convertMomentToDate(element.rsp_date)
                element.cogs_date = utils.convertMomentToDate(element.cogs_date)
                
            });
            form = {...form ,...{"retailers" : retailers} }
            console.log(form , "final form")
            this.pricing.calculatePricingMetrics(form).subscribe(data=>{
                console.log(data , "price simulated response...")

                this.pricing.setPricingSimulatedObservable(data)
            })
        }
    }

    removeRetailerEvent($event){
        if("product" in $event){
            this._filterPricingArray($event['product']  ,true)

        }
        if("retailer" in $event){
            this._filterPricingArray($event['retailer'] , false)

        }
        
        console.log($event , "remove retailer event fired..")
    }

    close($event){
        console.log(this.selected_retailer , "selected retailer")
        console.log(this.selected_product , "selected product")

        if($event=="filter-product-groups"){
            // if(!this.selected_retailer || this.selected_retailer == "Retailers"){
            //     // this.toastr.error("Set retailer to simulate")
            //     this.closeModal($event)
            //     return
            // }
            // if(!this.selected_product  || this.selected_product == "Product groups"){
            //     // this.toastr.error("Set product to simulate")
            //     this.closeModal($event)
            //     return
            // }
            // let p = this.product.find(e=>(e.account_name == this.selected_retailer)&&(e.product_group==this.selected_product))
        //     if(p){
        //         this.optimize.fetch_week_value(p.id)
        //     }
        //    this.hidepanel = false
        //     this.restApi.setAccAndPPGFilteredFlagObservable(true)
        }
        // if($event=="upload-weekly-promotions"){
        //     this.uploadFile()

        // }
        this.closeModal($event)
        // console.log($event)

    }
}
