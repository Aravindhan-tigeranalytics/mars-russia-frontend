import { Component, Output, EventEmitter, ViewChild, OnInit, Input,SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ListPromotion, PricingModel } from '@core/models';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ModalService } from '@molecules/modal/modal.service';
import {PricingService,OptimizerService,} from "@core/services"
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
@Component({
    selector: 'nwn-loaded-pricing-scenario-header',
    templateUrl: './loaded-pricing-scenario-header.component.html',
    styleUrls: ['./loaded-pricing-scenario-header.component.css'],
})
export class LoadedPricingScenarioHeaderComponent implements OnInit {
    selectedIndex!: number;
    constructor( private formBuilder: FormBuilder,
        private toastr: ToastrService,private pricingService : PricingService ,
        private modalService: ModalService,
        private optimizeService : OptimizerService) {
        this.pricingForm = this.formBuilder.group({
            // e.account_name  :new FormGroup({
            products : this.formBuilder.array([])
        // })

    })
    this.lenta  = this.pricingForm.get('products') as FormArray
}
    @Input()
    pricingArray : PricingModel[] = []
    unique_retailers : any[] = []
    lpi = 0
    rsp = 0
    cogs = 0
    elasticity = 0
    currentProduct:any = null
    pricingForm : FormGroup
    lenta : FormArray
    selected_main_product : string;
    selected_sub_product : string;
    displayProduct:any[]= []

    @Output()
    modalEvent = new EventEmitter<string>();

    @Output()
    simulateResetEvent = new EventEmitter<any>()


    saveScenario($event){
        if($event['type'] == "saveas"){
            $event['name']
            $event['comments']
            let form = {
                "name" : $event['name'],
                "comments" : $event["comments"],
                'value':this.pricingForm.value


            }
            this.pricingService.savePricingScenario(form).subscribe(data=>{
                if(data){
                    this.toastr.success('Scenario Saved Successfully','Success')
                    this.modalService.close('save-scenario')
                    let promotion : ListPromotion = {
                        "id" : data['saved_id'],
                        "name" : $event['name'],
                        "comments" : $event['comments'],
                        "scenario_type" : "pricing",
                    "meta" : this.getMetaArray(this.pricingForm.value)
    
                    }
                    
                    console.log(data , "pricing data returnresponse")
                    console.log(promotion , "saved promotion...")

                    this.optimizeService.addPromotionList(promotion)

                }
                
            })
           

        }


    }
    getMetaArray(pricing_form){
        let res:any= []
        pricing_form['products'].forEach(element => {
            res.push({
                "retailer" : element.account_name,
                "product_group" : element.product_group,
                "pricing" : {
                    "lpi" : element.inc_list_price,
                    "rsp" : element.inc_rsp,
                    "cogs" : element.inc_cogs,
                    "elasticity" : element.inc_elasticity,
                }
            })
            
        });
        return res

        // let res = []
        // for i
        // return [{
        //     "retailer" : '0',
        //     "product_group" : '0',
        //     "pricing" : false
        // }]

    }

    sendMessage(modalType: string): void {
        this.modalEvent.emit(modalType);
    }
    subProductSelectEvent(event){
        console.log(event , "sub product event...")
        this.selected_sub_product = event
        this.currentProduct = this.selected_main_product + this.selected_sub_product
        console.log(this.selected_sub_product , "selected sub product")
    }
    selectMainProduct(product){
        this.selected_main_product = product
        console.log(this.selected_main_product , "selected main product...")
    }
    onTabChanged(e){
        this.selected_main_product = this.displayProduct[e.index]
        this.currentProduct = this.selected_main_product + this.selected_sub_product
        // console.log(this.displayProduct[e.index] , "display producr") 
        // e.index
        console.log(e, "tab event...")
        console.log(this.selected_main_product)
    }

    // sho and hide more action menu
    isShowDivIf = true;

    toggleDisplayDivIf() {
        this.isShowDivIf = !this.isShowDivIf;
    }

    // expand and collapse
    isExpand = true;
    expandHeader() {
        this.isExpand = !this.isExpand;
    }
    // get lenta():FormArray{
    //     // debugger
    //     return 
    // }

    products: any[] = [
        {
            productName: 'Walmart',
        },
        {
            productName: 'Target',
        },
        {
            productName: 'Kohl’s',
        },
        {
            productName: 'Home Depot',
        },
        {
            productName: 'Publix',
        },
        {
            productName: 'Dollar Tree',
        },
        {
            productName: 'Costco',
        },
        {
            productName: 'Target',
        },
    ];

    productItems: any[] = [
        {
            productItemName: 'Milkyway XXL',
        },
        {
            productItemName: 'Skittles XXL',
        },
        {
            productItemName: 'Juicy Fruit XXL',
        },
        {
            productItemName: 'Bounty XXL',
        },
        {
            productItemName: 'Orbit XXL',
        },
        {
            productItemName: 'Skittles XXL',
        },
        {
            productItemName: 'Juicy Fruit XXL',
        },
        {
            productItemName: 'Bounty XXL',
        },
    ];

    select(index: number) {
        this.selectedIndex = index;
    }

    openTab = 0;
    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;
    }
    groupPricing(){
        this.unique_retailers = []

        this.pricingArray.forEach(e=>{
            let arr = this.lenta
            if(arr.length > 0){
           if(arr.length > 0 && !arr.value.find(d=>(d.product_group === e.product_group) && (d.account_name == e.account_name))){
               
            
            arr.push(
                 this.formBuilder.group({
                    retailer : [e.account_name + e.product_group],
                    account_name : [e.account_name],
                    product_group : [e.product_group],
                    list_price: [Number((e.list_price).toFixed(2))],
                    inc_list_price : [Number((e.list_price).toFixed(2))],
                    cogs: [Number(e.cogs).toFixed(2)],
                    inc_cogs: [Number(e.cogs).toFixed(2)],
                    elasticity : [Number((e.base_price_elasticity).toFixed(2))],
                    net_elasticity : [Number((e.net_elasticity).toFixed(2))],
                    inc_net_elasticity : [Number((e.net_elasticity).toFixed(2))],
                    inc_elasticity : [Number((e.base_price_elasticity).toFixed(2))],
                    rsp: [Number((e.retail_median_base_price_w_o_vat).toFixed(2))],
                    inc_rsp: [Number((e.retail_median_base_price_w_o_vat).toFixed(2))],
                    follow_competition: [false],

                 })
               )

           }
                

            }
            else{
                this.lenta.push(this.formBuilder.group({
                    retailer : [e.account_name + e.product_group],
                    account_name : [e.account_name],
                    product_group : [e.product_group],
                    list_price: [Number((e.list_price).toFixed(2))],
                    inc_list_price : [Number((e.list_price).toFixed(2))],
                    cogs: [Number(e.cogs).toFixed(2)],
                    inc_cogs: [Number(e.cogs).toFixed(2)],
                    elasticity : [Number((e.base_price_elasticity).toFixed(2))],
                    net_elasticity : [Number((e.net_elasticity).toFixed(2))],
                    inc_net_elasticity : [Number((e.net_elasticity).toFixed(2))],
                    inc_elasticity : [Number((e.base_price_elasticity).toFixed(2))],
                    rsp: [Number((e.retail_median_base_price_w_o_vat).toFixed(2))],
                    inc_rsp: [Number((e.retail_median_base_price_w_o_vat).toFixed(2))],
                    follow_competition: [false],

                }))
                
            }
            
        })
       
        this.unique_retailers = this.lenta.value
        console.log(this.unique_retailers , "unique retailers/...")
        if(this.unique_retailers.length > 0){
            this.currentProduct = this.unique_retailers[0]['retailer']
            this.selected_main_product = this.unique_retailers[0]['account_name']
            this.selected_sub_product = this.unique_retailers[0]['product_group']
            this.currentProduct = this.selected_main_product + this.selected_sub_product
            
        }
      
        

        // console.log(arr , "final array unique")
        console.log(this.pricingForm , "pricing form values")
        // console.log)
     
        // pricingForm.get('Lenta').controls.get('products')'
        this.displayProduct = this.pricingForm.controls.products.value.map(d=>d.account_name)
        this.displayProduct =  [...new Set(this.displayProduct)]
        // debugger
        // console.log(Object.keys(this.pricingForm.controls) , "Object.keys(this.pricingForm.controls)")
        // console.log(Object.keys(this.pricingForm.value) , "Object.keys(this.pricingForm.value)")


    }
    toggleEvent($event){
        console.log($event , "event toggling...")
        if($event.checked){
            this.elasticity = Number(this.currentProduct['net_elasticity'].toFixed(2));

        }
        else{
            this.elasticity = Number(this.currentProduct['elasticity'].toFixed(2));
        }
    }
    changeProduct(index , product_group){
this.currentProduct = this.unique_retailers[index]['products'].find(d=>d.product_group == product_group)
        this.formatPrice(this.currentProduct)
        // this.lpi = product['list_price']
        // this.rsp = product['rsp']
        // this.cogs = product['cogs']
        // this.elasticity = product['elasticity']

    }
    simulatePrice(){
        this.simulateResetEvent.emit({
            "type" : 'simulate',
            'data' : this.pricingForm.value
        })

    }
    formatPrice(product){
        this.lpi = Number(product['list_price'].toFixed(2));
        this.rsp = Number(product['rsp'].toFixed(2));
        this.cogs = Number(product['cogs'].toFixed(2));
        this.elasticity = Number(product['elasticity'].toFixed(2));
        
    }

    getTabLength(){
        // debugger
        var itemsLength = $(".mat-tab-label").length;
        var itemSize = $(".mat-tab-label").outerWidth(true);
        var getMenuSize  = itemsLength * itemSize!
        var getMenuWrapperSize =  $(".mat-tab-label-container").outerWidth();
        if(getMenuSize > getMenuWrapperSize!){
            $(".mat-tab-header-pagination").css('display' , 'flex')
        }
        else{
            $(".mat-tab-header-pagination").css('display' , 'none')
        }
        

        // mat-tab-header-pagination-chevron
        // mat-tab-header-pagination-chevron
        console.log(getMenuWrapperSize , "menu wrapper ")
        console.log(getMenuSize , "get menu size...")
    }
    ngAfterViewInit() {
        this.getTabLength()
        
    }

    ngOnInit() {
        
        

        // this.pricingForm.valueChanges.subscribe(data=>{
        //     console.log(data , "values changes form prcing form....")
        // })
    }
    ngOnChanges(changes : SimpleChanges) :void{
        for (let property in changes) {
            if (property === 'pricingArray') {
                this.pricingArray = changes[property].currentValue
                this.groupPricing()

            }
    }
    }
}
