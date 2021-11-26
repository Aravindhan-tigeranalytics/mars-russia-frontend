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
        "retailers" : this.selected_retailer,
        "category" : this.selected_category,
        "products" : this.selected_product,
        "strategic_cell" : this.selected_strategic_cell,
        "brand" : this.selected_brand,
        "brand_format" : this.selected_brand_format
    }

    retailers:Array<CheckboxModel> = []
    categories:Array<CheckboxModel> = [] 
    strategic_cell:Array<CheckboxModel> = []
    brands_format:Array<CheckboxModel> = []
    brands:Array<CheckboxModel> = []
    product_group:Array<CheckboxModel> = []
    showtbas = false

    hierarchy_model : Array<HierarchyCheckBoxModel> = []
    total_hierarchy_model : Array<HierarchyCheckBoxModel> = []
    
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

    hier_null($event){
        console.log($event ,"event")
    }
    _populateHierarchyModel(products : Product[]){
        this.hierarchy_model = []
        this.total_hierarchy_model = []
        // if(products.length > 0){
        //     this.hierarchy_model.push({"value" : "All" , "checked" : false,"child" : []}) 
        // }

        // this.hierarchy_model.push({"value" : "All" , "checked" : true,"child" : []})
        this.retailers.forEach(d=>{
            
            this.hierarchy_model.push({...d , ...{"child" : products.filter(p=>p.account_name == d.value).map(m=>({"value" : m.product_group , "checked" : false,"id" : m.id}))}})
            
            
        })
        this.total_hierarchy_model = this.hierarchy_model
        console.log(this.hierarchy_model , "hierarchy model......")

    }
    _populateFilters(products : Product[]){
        if(products.length>0){
            this.retailers = []
            
            this.categories = [] 
            this.strategic_cell = []
            this.brands_format = []
            this.brands = []
            this.product_group = []
            // this.retailers.push({"value" : "All" , "checked" : false})
        
            this.retailers =[...this.retailers , ...[...new Set(products.map(item => item.account_name))].map(e=>({"value" : e,"checked" : false}))] ;
            this.categories = [...this.categories,...[...new Set(products.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : false}))];
            this.strategic_cell = [...this.strategic_cell,...[...new Set(products.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : false}))];
            this.brands_format = [...this.brands_format,...[...new Set(products.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : false}))];
            this.brands = [...this.brands,...[...new Set(products.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : false}))];
            this.product_group = [...this.product_group,...[...new Set(products.map(item => item.product_group))].map(e=>({"value" : e,"checked" : false}))];
         //    debugger 
            this._populateHierarchyModel(products)
        }
        
    // this.retailers.forEach(() => this.ordersFormArray.push(new FormControl(false)));
      

    }
    updateFormWhileLoading($event){
        $event.meta.forEach(element => {
            this.hierarchy_model.forEach(dm=>{
                if(dm.value == element.retailer){
                    dm.checked = true
                    dm.child.forEach(dc=>{
                        if(dc.value == element.product_group){
                            dc.checked = true
                        }
                    })
                }
            })
             
            this.selected_retailer = [...this.selected_retailer,element.retailer]
            
            this.retailers.filter(val=>val.value ==element.retailer).forEach(val=>val.checked = true)

            this.selected_product = [...this.selected_product,element.product_group]
            this.product_group.filter(val=>val.value == element.product_group).forEach(val=>val.checked = true)

            
       
            
            
        });
        this.selected_product = [...new Set(this.selected_product)];
        this.selected_retailer = [...new Set(this.selected_retailer)];
        this.count_ret = {...this.count_ret ,...{"retailers" : this.selected_retailer,
        "products" : this.selected_product}}

    }
    // this.hierarchy_model.filter(d=>d.value == event.value)[0].checked = true

    loadScenarioEvent($event){
        // debugger
        let ids:any[]= []
        this.reset()

        if($event.scenario_type == 'pricing'){
            ids = $event.meta.map(d=>this.product.filter(dd=>(dd.account_name == d.retailer && (dd.product_group == d.product_group)))[0]).map(d=>d.id)
            this.updateFormWhileLoading($event)
        }
        else{
            ids = this.product.filter(dd=>(dd.account_name == $event.meta.retailer && (dd.product_group == $event.meta.product_group))).map(d=>d.id)

        }
        // utils.isArray()
        // debugger
        
        
        // debugger
       
        this.pricing.getPricingMetric(ids).subscribe(data=>{
            this.pricingArray = [...this.pricingArray , ...data]
            console.log(data , "pricin metics data...")
        })
    }
  
    reset(){
        // debugger
        
        this._populateFilters(this.product)
        this.optimize.setProductWeekObservable([])
        this.optimize.setLoadedScenarioModel(null as any)
        this.restApi.setIsSaveScenarioLoadedObservable(null)
        this.pricing.setPricingSimulatedObservable(null as any);
        // this.pricingArray = [...this.pricingArray , ...[]]
        this.pricingArray = []
        this.selected_retailer = []
        this.selected_brand = []
        this.selected_brand_format= []
        this.selected_category= []
        this.selected_strategic_cell= []
        this.selected_product = []
        this.count_ret = {
            "retailers" : this.selected_retailer,
        "products" : this.selected_product,
        "brand" : this.selected_brand,
        "brand_format" : this.selected_brand_format,
        "strategic_cell" : this.selected_strategic_cell,
        "category" : this.selected_category
        
        }
        // debugger
        console.log(this.count_ret , "count ret ater resrt")
        
        this.filter_model =  {"retailer" : "Retailers" , "brand" : 'Brands' , "brand_format" : 'Brand Formats' ,
        "category" : 'Category' , "product_group" : 'Product groups' , "strategic_cell" :  'Strategic cells'}
        
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
    
    retailerChange(filter_hier = true){
        // debugger
            this.retailers.forEach(d=>d.checked = this.selected_retailer.includes(d.value))
            if(this.selected_retailer.length > 0){
                this.categories = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category.includes(e))}));
                this.product_group = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product.includes(e))}));
                this.strategic_cell = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
                this.brands_format = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
                this.brands = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand.includes(e))}));
                this.hierarchy_model = []

                this.retailers.forEach(d=>{
                    if(this.selected_retailer.includes(d.value)){
                        // debugger
                        this.hierarchy_model.push({...d,...{"checked":false} , ...{"child" : this.product.filter(p=>p.account_name == d.value)
                    .filter(val=>this.selected_retailer.includes(val.account_name))
                    .map(m=>({"value" : m.product_group , "checked" : false,"id" : m.id}))}})
                    

                    }
                    
                })
            }
            else{
                 this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category.includes(e))}));
            this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product.includes(e))}));
            this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
            this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
            this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand.includes(e))}));
            
            this.hierarchy_model = []

            this.retailers.forEach(d=>{
               
            
                this.hierarchy_model.push({...d , ...{"child" : this.product.filter(p=>p.account_name == d.value)
               
                .map(m=>({"value" : m.product_group , "checked" : false,"id" : m.id}))}})
                
                
            })
        }
      
        
           
            // this.hierarchy_model = this.total_hierarchy_model.filter(d=>this.selected_retailer.includes(d.value)) 
            // this.hierarchy_model.forEach(d=>d.checked = true)

         
       
        
       
    }

  
    categoryChange(){
        this.categories.forEach(d=>d.checked = this.selected_category.includes(d.value))

        if(this.selected_category.length > 0){
            this.strategic_cell = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
            this.product_group = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.product_group))].map(e=>({"value" : e,"checked" :  (this.selected_product.includes(e))}));
            this.retailers = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer.includes(e))}));
            this.brands_format = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
            this.brands = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand.includes(e))}));
            this.hierarchy_model = []

            this.retailers.forEach(d=>{
                if(this.selected_retailer.includes(d.value)){
            
                this.hierarchy_model.push({...d , ...{"child" : this.product.filter(p=>p.account_name == d.value)
                .filter(val=>this.selected_category.includes(val.corporate_segment))
                .map(m=>({"value" : m.product_group , "checked" : false,"id" : m.id}))}})
                }
                
            })

        }
        else{
            this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
            this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" :  (this.selected_product.includes(e))}));
            this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer.includes(e))}));
            this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
            this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand.includes(e))}));
            this.hierarchy_model = []

            this.retailers.forEach(d=>{
            
                this.hierarchy_model.push({...d , ...{"child" : this.product.filter(p=>p.account_name == d.value)
                
                .map(m=>({"value" : m.product_group , "checked" : false,"id" : m.id}))}})
                
                
            })
        }
            

        
        

    }

    brandFormatChange(){
        
        this.brands_format.forEach(d=>d.checked = this.selected_brand_format.includes(d.value))
        if(this.selected_brand_format.length > 0){
            this.strategic_cell = [...new Set(this.product.filter(val=>this.selected_brand_format.includes(val.brand_format_filter)).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
            this.product_group = [...new Set(this.product.filter(val=>this.selected_brand_format.includes(val.brand_format_filter)).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product).includes(e)}));
            this.retailers = [...new Set(this.product.filter(val=>this.selected_brand_format.includes(val.brand_format_filter)).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer).includes(e)}));
            this.brands = [...new Set(this.product.filter(val=>this.selected_brand_format.includes(val.brand_format_filter)).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand).includes(e)}));
            this.categories = [...new Set(this.product.filter(val=>this.selected_brand_format.includes(val.brand_format_filter)).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category).includes(e)}));
    
            this.hierarchy_model = []

            this.retailers.forEach(d=>{
                if(this.selected_retailer.includes(d.value)){
            
                this.hierarchy_model.push({...d , ...{"child" : this.product.filter(p=>p.account_name == d.value)
                .filter(val=>this.selected_brand_format.includes(val.brand_format_filter))
                .map(m=>({"value" : m.product_group , "checked" : false,"id" : m.id}))}})
                }
                
            })
        }
        else{
            this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
            this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product).includes(e)}));
            this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer).includes(e)}));
            this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand).includes(e)}));
            this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category).includes(e)}));
    
            this.hierarchy_model = []

            this.retailers.forEach(d=>{
            
                this.hierarchy_model.push({...d , ...{"child" : this.product.filter(p=>p.account_name == d.value)
               
                .map(m=>({"value" : m.product_group , "checked" : false,"id" : m.id}))}})
                
                
            })

        }


       

      
    }

    strategicCellChange(){
        this.strategic_cell.forEach(d=>d.checked = this.selected_strategic_cell.includes(d.value))
        if(this.selected_strategic_cell.length > 0){
            this.categories = [...new Set(this.product.filter(val=>this.selected_strategic_cell.includes(val.strategic_cell_filter)).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category).includes(e)}));
            this.product_group = [...new Set(this.product.filter(val=>this.selected_strategic_cell.includes(val.strategic_cell_filter)).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product).includes(e)}));
            this.retailers = [...new Set(this.product.filter(val=>this.selected_strategic_cell.includes(val.strategic_cell_filter)).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer).includes(e)}));
            this.brands_format = [...new Set(this.product.filter(val=>this.selected_strategic_cell.includes(val.strategic_cell_filter)).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format).includes(e)}));
            this.brands = [...new Set(this.product.filter(val=>this.selected_strategic_cell.includes(val.strategic_cell_filter)).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand).includes(e)}));
            this.hierarchy_model = []

            this.retailers.forEach(d=>{
                if(this.selected_retailer.includes(d.value)){
            
                this.hierarchy_model.push({...d , ...{"child" : this.product.filter(p=>p.account_name == d.value)
                .filter(val=>this.selected_strategic_cell.includes(val.strategic_cell_filter))
                .map(m=>({"value" : m.product_group , "checked" : false,"id" : m.id}))}})
                
                }
            })

        }
        else{
            this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category).includes(e)}));
            this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product).includes(e)}));
            this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer).includes(e)}));
            this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format).includes(e)}));
            this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand).includes(e)}));
            this.hierarchy_model = []

            this.retailers.forEach(d=>{
            
                this.hierarchy_model.push({...d , ...{"child" : this.product.filter(p=>p.account_name == d.value)
                .map(m=>({"value" : m.product_group , "checked" : false,"id" : m.id}))}})
                
                
            })

        }
            
 
       

    }
        brandChange(){
           
            this.brands.forEach(d=>d.checked = this.selected_brand.includes(d.value))
            if(this.selected_brand.length > 0){
                this.strategic_cell = [...new Set(this.product.filter(val=>this.selected_brand.includes(val.brand_filter)).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
            this.product_group = [...new Set(this.product.filter(val=>this.selected_brand.includes(val.brand_filter)).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product.includes(e))}));
            this.retailers = [...new Set(this.product.filter(val=>this.selected_brand.includes(val.brand_filter)).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer.includes(e))}));
            this.brands_format = [...new Set(this.product.filter(val=>this.selected_brand.includes(val.brand_filter)).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
            this.categories = [...new Set(this.product.filter(val=>this.selected_brand.includes(val.brand_filter)).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category.includes(e))}));
            this.hierarchy_model = []

            this.retailers.forEach(d=>{
                if(this.selected_retailer.includes(d.value)){
            
                this.hierarchy_model.push({...d , ...{"child" : this.product.filter(p=>p.account_name == d.value)
                .filter(val=>this.selected_brand.includes(val.brand_filter))
                .map(m=>({"value" : m.product_group , "checked" : false,"id" : m.id}))}})
                }
                
            })
           
            }
            else{
                this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
            this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product.includes(e))}));
            this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer.includes(e))}));
            this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
            this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category.includes(e))}));
            this.hierarchy_model = []

            this.retailers.forEach(d=>{
            
                this.hierarchy_model.push({...d , ...{"child" : this.product.filter(p=>p.account_name == d.value)
                .map(m=>({"value" : m.product_group , "checked" : false,"id" : m.id}))}})
                
                
            })
              
        }
            
            
        
            
        //     let prods = this.product_group.map(d=>d.value)
        //     // console.log(prods , "prods result")
        //     let res:any[] = []
        //  this.total_hierarchy_model.forEach(d=>{
        //    res.push({"key": d.value,"value":d.child.filter(ch=>prods.includes(ch.value))})
        // //    this.hierarchy_model.filter(hm=>hm.value == d.value)[0].child = filtered

                

        //     })
        //     console.log(res , "res..")
            // this.hierarchy_model.forEach(d=>{
            //     res.forEach(rr=>{
            //        if(rr.key==d.value){
            //            d.child = rr.value
            //        }
            //     })
            // })
            // console.log(this.total_hierarchy_model , "totaal hier model")
            // console.log(this.hierarchy_model , "hier model ")
            // console.log(res , "total result")
            // let cv= this.hierarchy_model.forEach(function(hm){
            //     return hm.child.filter(d=>prods.includes(d.value))

            // })
            // const filterByTagSet = new Set(prods);
//             const result = this.total_hierarchy_model.filter((o) => 
//   o.child.filter((om)=>om.va)
// );

            // var foo = this.total_hierarchy_model.filter(function(elm){
            //     return elm.child.indexOf("camping")>=0
            //   });
        //   this.total_hierarchy_model.forEach(d=>d.child.filter(ch=>prods.includes(ch.value)))
            // console.log(cv , "hierm")

            // this.retailers.forEach(d=>{
            
            //     this.hierarchy_model.push({...d , ...{"child" : this.product_group }})
                
                
            // })
            console.log(this.hierarchy_model , "hier model..")
             
        
       

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
        // this.count_ret = {...this.count_ret ,...{"products" : this.selected_product.length}}
       

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
            this.retailerChange(false)
            // this.retailerChange(event,false)
            
            
        }

        
        
    }
    filterApply(event){
        // console.log(event , "filter apply event")
        

        
       
        if(event.key != undefined){
            if(event.key == 'Retailer'){
                this.selected_retailer = event['values']
                this.retailerChange()
                this.count_ret['retailers'] = this.selected_retailer
                // this.count_ret = {...this.count_ret ,...{"retailers" : this.selected_retailer.length}}
    
            }
            else if(event.key == 'Category'){
                this.selected_category = event['values']
                this.categoryChange()
                this.count_ret['category'] = this.selected_category

            // this.count_ret = {...this.count_ret ,...{"category" : this.selected_category.length}}
            }
            else if(event.key == 'Strategic cells'){
                this.selected_strategic_cell = event['values']
                this.strategicCellChange()
                this.count_ret['strategic_cell'] = this.selected_strategic_cell
                // this.count_ret = {...this.count_ret ,...{"strategic_cell" : this.selected_strategic_cell.length}}
                    
            }
            else if(event.key == 'Brands'){
                this.selected_brand = event['values']
                this.brandChange()
                this.count_ret['brand'] = this.selected_brand
                // this.count_ret = {...this.count_ret ,...{"brand" : this.selected_brand.length}}
            }
            else if(event.key == 'Brand Formats'){
                this.selected_brand_format = event['values']
                this.brandFormatChange()
                this.count_ret['brand_format'] = this.selected_brand_format
                // this.count_ret = {...this.count_ret ,...{"brand_format" : this.selected_brand_format.length}}
                
            }
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
            else if(event.key == 'Product groups'){
                this.selected_product= []
                // debugger
                console.log(this.hierarchy_model , "hierarchy model...product group")
                // console.log(this.product , "availalbe product......")
                let ret = this.hierarchy_model.filter(d=>d.checked)
                ret.forEach(d=>{
                    d.child.forEach(ch=>{
                        if(ch.checked){
                            this.selected_product.push(ch.value)

                        }
                    })
                })
                this.selected_retailer = ret.map(d=>d.value)
                this.selected_product = [...new Set(this.selected_product)];
        this.selected_retailer = [...new Set(this.selected_retailer)];

                this.count_ret = {...this.count_ret ,...{"products" : this.selected_product,
            "retailers":this.selected_retailer}}
                this.closeModal("addnew-pricngtool")
              
               
                let selected = 
                 [].concat.apply([] , this.hierarchy_model.filter(d=>d.checked).map(d=>d.child.filter(d=>d.checked).map(d=>d.id)) as any[]);
               
                console.log(selected , "selected product for api")
                 
                this.pricing.getPricingMetric(selected).subscribe(data=>{
                    this.pricingArray = []
                    this.pricingArray = [...this.pricingArray , ...data]
                    console.log(data , "pricin metics data...")
                },err=>{
                    throw err
                })
               
            }
        }
    }
    _filterPricingArray(obj , is_product){
       if(is_product){
        this.pricingArray = this.pricingArray.filter(d=>!(d.account_name == obj['retailer'] && d.product_group == obj["product"]))
        var idx = this.selected_product.findIndex(p =>p== obj["product"]);
        this.selected_product.splice(idx,1); 
        this.count_ret = {...this.count_ret ,...{"products" : this.selected_product}}

       }
       else{
        this.pricingArray = this.pricingArray.filter(d=>!(d.account_name == obj['retailer']))
        var idx = this.selected_retailer.findIndex(p =>p== obj["retailer"]);
        this.selected_retailer.splice(idx,1); 
        this.count_ret = {...this.count_ret ,...{"retailers" : this.selected_retailer}}

       }
      
        console.log(this.selected_product , "sel pr af")
    }
    simulateReset($event){
        console.log($event , "simulate reser")
      
        if($event.type == 'simulate'){
            
            let form = {...$event.data}
            let retailers:any = []
            form.products.forEach(element => {
                retailers.push({"account_name" : element.account_name , "product_group" : element.product_group})
                element.list_price_date = utils.convertMomentToDate(element.list_price_date)
                element.rsp_date = utils.convertMomentToDate(element.rsp_date)
                element.cogs_date = utils.convertMomentToDate(element.cogs_date)
                
            });
            form = {...form ,...{"retailers" : retailers} }
            this.pricing.calculatePricingMetrics(form).subscribe(data=>{
                console.log(data , "price simulated response...")

                this.pricing.setPricingSimulatedObservable(data)
            })
        }
        else{
            this.reset()

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
           
        }
         
        this.closeModal($event)
        

    }
}
// categoryChange(event:CheckboxModel){
//     // console.log(event)
//     // console.log(this.selected_retailer , "selected reatilser")
//     // this.categories.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
//     if(event.checked){
//         this.selected_category =[...this.selected_category, event.value]
//         // this.selected_retailer = [...this.selected_retailer, event.value]

//         this.categories.filter(val=>val.value == event.value).forEach(val=>val.checked = true)
        
//         // this.filter_model.category = this.selected_category
//         this.strategic_cell = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
//         this.product_group = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.product_group))].map(e=>({"value" : e,"checked" :  (this.selected_product.includes(e))}));
//         this.retailers = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer.includes(e))}));
//         this.brands_format = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
//         this.brands = [...new Set(this.product.filter(val=>this.selected_category.includes(val.corporate_segment)).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand.includes(e))}));

//     }
//     else{
//         this.selected_category = this.selected_category.filter(e=>e!=event.value)


//         this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
//         this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" :  (this.selected_product.includes(e))}));
//         this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer.includes(e))}));
//         this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
//         this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand.includes(e))}));


//     }
    

// }


// retailerChangebkp(event:CheckboxModel , filter_hier = true){
//     console.log(event , "Event checked....")
//     console.log(this.selected_retailer , "selected rertail")

//     if(event.checked){
//         if(event.value == "All"){
//             this.retailers.forEach(d=>{
//                 d.checked = true
//                 this.selected_retailer = [...this.selected_retailer, d.value]
//                 if( this.hierarchy_model.filter(d=>d.value == event.value).length > 0){
//                     this.hierarchy_model.forEach(d=>{
//                         d.checked = true
//                     })
        
//                 }
//             })

//         }
//         else{
//             this.selected_retailer = [...this.selected_retailer, event.value]
       
//             this.retailers.filter(val=>val.value == event.value).forEach(val=>val.checked = true)

//             this.categories = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category.includes(e))}));
//         this.product_group = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product.includes(e))}));
//         this.strategic_cell = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
//         this.brands_format = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
//         this.brands = [...new Set(this.product.filter(val=>this.selected_retailer.includes(val.account_name)).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand.includes(e))}));
//          if(filter_hier){
//             this.hierarchy_model = this.total_hierarchy_model.filter(d=>this.selected_retailer.includes(d.value))

//          }
      
//         if( this.hierarchy_model.filter(d=>d.value == event.value).length > 0){
//             this.hierarchy_model.filter(d=>d.value == event.value)[0].checked = true

//         }
        

//         }
        
        
       
//     }
//     else{
//         if(event.value == "All"){
//             this.retailers.forEach(d=>{
//                 d.checked = false
//                 this.selected_retailer = this.selected_retailer.filter(e=>e!=d.value)
//                 if( this.hierarchy_model.filter(d=>d.value == event.value).length > 0){
//                     this.hierarchy_model.forEach(d=>{
//                         d.checked = false
//                     })
        
//                 }
//             })

//         }
//         else{
//             this.selected_retailer = this.selected_retailer.filter(e=>e!=event.value)
//             this.retailers.filter(val=>val.value == event.value).forEach(val=>val.checked = false)

//         this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category.includes(e))}));
//     this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product.includes(e))}));
//     this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
//     this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
//     this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand.includes(e))}));
//     // this.hierarchy_model.filter(d=>d.value == event.value)[0].checked = false
//     if(filter_hier){
//         this.hierarchy_model = this.total_hierarchy_model

//      }
   
//     if(this.hierarchy_model.filter(d=>d.value == event.value).length > 0){
//         this.hierarchy_model.filter(d=>d.value == event.value)[0].checked = false

//     }

//         }
        
    

//     }

   
    
   
// }

// brandFormatChange(event:CheckboxModel){
//     this.brands_format.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
//     if(event.checked){
//         this.selected_brand_format =  [...this.selected_brand_format, event.value]
//         // this.selected_brand = [...this.selected_brand, event.value]
//         this.brands_format.filter(val=>val.value == event.value).forEach(val=>val.checked = true)
//         // this.filter_model.brand_format = this.selected_brand_format

//     this.strategic_cell = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
//     this.product_group = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product).includes(e)}));
//     this.retailers = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer).includes(e)}));
//     this.brands = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand).includes(e)}));
//     this.categories = [...new Set(this.product.filter(val=>val.brand_format_filter == event.value).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category).includes(e)}));


//     }
//     else{
//         this.selected_brand_format = this.selected_brand_format.filter(e=>e!=event.value)
//         // this.selected_brand_format = 'Brand Formats'
//         this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell).includes(e)}));
//         this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product).includes(e)}));
//         this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer).includes(e)}));
//         this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand).includes(e)}));
//         this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category).includes(e)}));


//     }
//     // this.count_ret = {...this.count_ret ,...{"brand_format" : this.selected_brand_format.length}}
    

// }

// strategicCellChange(event:CheckboxModel){
//     this.strategic_cell.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
//     if(event.checked){
//         // this.selected_strategic_cell = event.value
//         this.selected_strategic_cell =[...this.selected_strategic_cell, event.value]
//         this.strategic_cell.filter(val=>val.value == event.value).forEach(val=>val.checked = true)
//         // this.filter_model.strategic_cell = this.selected_strategic_cell
//         this.categories = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category).includes(e)}));
//         this.product_group = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product).includes(e)}));
//         this.retailers = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer).includes(e)}));
//         this.brands_format = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format).includes(e)}));
//         this.brands = [...new Set(this.product.filter(val=>val.strategic_cell_filter == event.value).map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand).includes(e)}));

//     }
//     else{
//         this.selected_strategic_cell = this.selected_strategic_cell.filter(e=>e!=event.value)
//         // this.selected_strategic_cell = 'Strategic cells'
//         this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category).includes(e)}));
//         this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product).includes(e)}));
//         this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer).includes(e)}));
//         this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format).includes(e)}));
//         this.brands = [...new Set(this.product.map(item => item.brand_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand).includes(e)}));


//     }
//     // this.count_ret = {...this.count_ret ,...{"strategic_cell" : this.selected_strategic_cell.length}}
   

// }
//     brandChange(event:CheckboxModel){
        
//     this.brands.filter(val=>val.value != event.value).forEach(val=>val.checked = false)
//     if(event.checked){
//         this.selected_brand = [...this.selected_brand, event.value]
//         this.brands.filter(val=>val.value == event.value).forEach(val=>val.checked = true)
//         // this.filter_model.brand = this.selected_brand

//         this.strategic_cell = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
//         this.product_group = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product.includes(e))}));
//         this.retailers = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer.includes(e))}));
//         this.brands_format = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
//         this.categories = [...new Set(this.product.filter(val=>val.brand_filter == event.value).map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category.includes(e))}));
// // debugger

//     }
//     else{
//         this.selected_brand = this.selected_brand.filter(e=>e!=event.value)
//         // this.selected_brand = 'Brands'
//         this.strategic_cell = [...new Set(this.product.map(item => item.strategic_cell_filter))].map(e=>({"value" : e,"checked" : (this.selected_strategic_cell.includes(e))}));
//         this.product_group = [...new Set(this.product.map(item => item.product_group))].map(e=>({"value" : e,"checked" : (this.selected_product.includes(e))}));
//         this.retailers = [...new Set(this.product.map(item => item.account_name))].map(e=>({"value" : e,"checked" : (this.selected_retailer.includes(e))}));
//         this.brands_format = [...new Set(this.product.map(item => item.brand_format_filter))].map(e=>({"value" : e,"checked" : (this.selected_brand_format.includes(e))}));
//         this.categories = [...new Set(this.product.map(item => item.corporate_segment))].map(e=>({"value" : e,"checked" : (this.selected_category.includes(e))}));


//     }
//     // this.count_ret = {...this.count_ret ,...{"brand" : this.selected_brand.length}}
   

// }
