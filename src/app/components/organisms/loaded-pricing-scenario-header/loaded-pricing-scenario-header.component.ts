import { Component, Output, EventEmitter, ViewChild, OnInit, Input,SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PricingModel } from '@core/models';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
    selector: 'nwn-loaded-pricing-scenario-header',
    templateUrl: './loaded-pricing-scenario-header.component.html',
    styleUrls: ['./loaded-pricing-scenario-header.component.css'],
})
export class LoadedPricingScenarioHeaderComponent implements OnInit {
    selectedIndex!: number;
    constructor( private formBuilder: FormBuilder,) {
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

    sendMessage(modalType: string): void {
        this.modalEvent.emit(modalType);
    }
    selectMainProduct(product){
        this.selected_main_product = product
        console.log(this.selected_main_product , "selected main product...")
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

        let d={
            "account_name" : 'lenta',
            "products" :[{
                "product_group" : 'orbit otx',
                // 'list_price' : 9.0
            },
        {
            'product_group' : 'orbit xxl'
        }]
        }
        // {
        //     'account_name' : e.account_name,
        //     'products' : [{
        //         "product_group" : e.product_group,
        //         "list_price" : Number((e.list_price).toFixed(2)),
        //         'rsp' : Number((e.retail_median_base_price_w_o_vat).toFixed(2)),
        //         "cogs" : Number((e.list_price - (e.list_price * e.gmac)).toFixed(2)) ,
        //         'elasticity' : Number((e.base_price_elasticity).toFixed(2)),
        //         'net_elasticity':Number((e.net_elasticity).toFixed(2)),
        //     }]
        // }
        let arr:any[] = []
        this.pricingArray.forEach(e=>{
            let arr = this.lenta
            if(arr.length > 0){
               
                
             //    if(arr)
           if(arr.length > 0 && !arr.value.find(d=>(d.product_group === e.product_group) && (d.account_name == e.account_name))){
               
            
            arr.push(
                 this.formBuilder.group({
                    account_name : [e.account_name],
                     product_group : [e.product_group],
                     list_price: [0],
                     cogs: [0],
                     elasticity : [0],
                     net_elasticity : [0],

                 })
               )

           }
                
            //  }
            // if(arr.find(d=>d.account_name == e.account_name)){
            //     // debugger
                
            //    let p =  arr.find(d=>d.account_name == e.account_name)
            //    if(!p['products'].find(val=>val.product_group == e.product_group)){
            //     p['products'].push({
            //         "product_group" : e.product_group,
            //         "list_price" :Number((e.list_price).toFixed(2)),
            //             'rsp' : Number((e.retail_median_base_price_w_o_vat).toFixed(2)),
            //             "cogs" :  Number((e.list_price - (e.list_price * e.gmac)).toFixed(2)) ,
            //             'elasticity' :  Number((e.base_price_elasticity).toFixed(2)),
            //             'net_elasticity':Number((e.net_elasticity).toFixed(2)),
            //     })
                   
            //    }
              

            }
            else{
                this.lenta.push(this.formBuilder.group({
                    account_name : [e.account_name],
                    product_group : [e.product_group],
                    list_price: [0],
                    cogs: [0],
                    elasticity : [0],
                    net_elasticity : [0],

                }))
                // this.pricingForm = this.formBuilder.group({
                //         // e.account_name  :new FormGroup({
                //         products : this.formBuilder.array([])
                //     // })

                // })
                // this.pricingForm.addControl(
                //     e.account_name  , new FormGroup({
                //         products : this.formBuilder.array([this.formBuilder.group({
                //             product_group : [e.product_group],
                //             list_price: [0],
                //             cogs: [0],
                //             elasticity : [0],
                //             net_elasticity : [0],

                //         })])
                //     })
                // )
                // arr.push({
                //     'account_name' : e.account_name,
                //     'products' : [{
                //         "product_group" : e.product_group,
                //         "list_price" : Number((e.list_price).toFixed(2)),
                //         'rsp' : Number((e.retail_median_base_price_w_o_vat).toFixed(2)),
                //         "cogs" : Number((e.list_price - (e.list_price * e.gmac)).toFixed(2)) ,
                //         'elasticity' : Number((e.base_price_elasticity).toFixed(2)),
                //         'net_elasticity':Number((e.net_elasticity).toFixed(2)),
                //     }]
                // })
                
            }
            
        })
        this.unique_retailers = arr
        if(this.unique_retailers.length > 0){
            this.currentProduct = this.unique_retailers[0]['products'][0]
            this.formatPrice(this.currentProduct)
            // this.lpi = first['list_price']
            // this.rsp = first['rsp']
            // this.cogs = first['cogs']
            // this.elasticity = first['elasticity']

        }
      
        

        console.log(arr , "final array unique")
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
    formatPrice(product){
        this.lpi = Number(product['list_price'].toFixed(2));
        this.rsp = Number(product['rsp'].toFixed(2));
        this.cogs = Number(product['cogs'].toFixed(2));
        this.elasticity = Number(product['elasticity'].toFixed(2));
        
    }

    ngOnInit() {

        this.pricingForm.valueChanges.subscribe(data=>{
            console.log(data , "values changes form prcing form....")
        })
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
