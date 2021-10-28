import { Component, Output, EventEmitter, ViewChild, OnInit, Input,SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CheckboxModel, ListPromotion, MetaInfo, PricingModel, PricingPromoModel } from '@core/models';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ModalService } from '@molecules/modal/modal.service';
import {PricingService,OptimizerService,} from "@core/services"
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
 
// import {FlatTreeControl} from "@angular/cdk/tree"
import {MatAccordion} from '@angular/material/expansion';
import * as FileSaver from 'file-saver';
import * as utils from "@core/utils"
 
import {DatePickerComponent} from 'ng2-date-picker';
import * as moment from 'moment';

 
   
@Component({
    selector: 'nwn-loaded-pricing-scenario-header',
    templateUrl: './loaded-pricing-scenario-header.component.html',
    styleUrls: ['./loaded-pricing-scenario-header.component.css'],
})
export class LoadedPricingScenarioHeaderComponent implements OnInit {
    rets = ['Orbit OTC' ]
    panels = ["Tander" , "Lenta" , "Pyatraochka"]
    @ViewChild(MatAccordion) accordion: MatAccordion;
    @ViewChild('dayPicker') datePicker: DatePickerComponent;
    step = 0;
    uploaded_file:any = null

    open(element) { 
         console.log(element , "");
        (element as DatePickerComponent).api.open()
        // console.log(element)
        // console.log(this.datePicker , "datepicker")

        // this.datePicker.api.open(); 
    }  
    close() { this.datePicker.api.close(); }

    openJquryDate(){

        $( function() {
            
            ($("#my_date_picker") as any).datepicker();
          } );
       
        ($("#my_date_picker") as any).datepicker();
    }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
    
    
    selectedIndex!: number;
    treemode = false
    
    
     
  
     
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

    

    @Input()
    count_ret : any
    unique_retailers : any[] = []
    lpi = 0
    rsp = 0
    cogs = 0
    elasticity = 0
    currentProduct:any = null
    currentProductGroup:CheckboxModel[] = []
    pricingForm : FormGroup
    lenta : FormArray
    selected_main_product : string;
    selected_sub_product : string;
    displayProduct:any[]= []
    ret = ['abc']
    chosen_promotion : ListPromotion = null as any
    applyAllMetric = "List Price"

    addRet(){
        this.ret = [...this.ret , 'abd']
        this.getTabLength()
    }

    @Output()
    modalEvent = new EventEmitter<string>();

    @Output()
    simulateResetEvent = new EventEmitter<any>()

    @Output()
    loadScenarioEvent = new EventEmitter<any>()

    @Output()
    removeRetailerEvent = new EventEmitter()

    removeProductEvent(index , retailer){
        console.log(index , "event")
        console.log(retailer , "product of")
        console.log(this.lenta.value , "array values")
        this.removeRetailerEvent.emit({
            "product" : {
                "retailer" : retailer,
                "product" : this.lenta.value[index]["product_group"]
            }
        })
    } 
    removeRetailer(retailer){
        this.removeRetailerEvent.emit({
            "retailer" : {
                "retailer" : retailer,
               
            }
        })

    }
    closeModal($event){
        this.uploadFile()
        this.modalService.close($event)
    }
    downloadWeekly(){
        
        this.pricingService.downloadPricingWeekly(this.pricingForm.value).subscribe(data=>{
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            // console.log(data , "download api called and returned...")
            this.toastr.success('File Downloaded Successfully','Success');
            FileSaver.saveAs(
                blob,
                'pricingWeekly' + '_export_' + new Date().getTime() + 'xlsx'
                )
                ,(err:any)=>{
                    this.toastr.warning(err.error,'Failed');
                }
        })
    }

    downloadPricing(){
        this.pricingService.downloadPricing().subscribe(data=>{
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            console.log(data , "download api called and returned...")
            this.toastr.success('File Downloaded Successfully','Success');
            FileSaver.saveAs(
                blob,
                'pricing' + '_export_' + new Date().getTime() + 'xlsx'
                )
                ,(err:any)=>{
                    this.toastr.warning(err.error,'Failed');
                }
        })
    }

    saveScenario($event){
        console.log(this.pricingForm.value , "....pricing from value....")
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
                // "lis"
                "cogs_date" : element.cogs_date,
                "list_price_date" : element.list_price_date,  
                "rsp_date": element.rsp_date,
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
    isCheckBoxModel(check:CheckboxModel[] , val){
        return check.find(c=>c.value == val)?.checked
       
    }

    applyCloseEvent($event){
        // console.log($event , "Event..")
        // console.log(this.currentProduct , "current  retailer")
        $event['metric']
        $event['value']["date"]
        $event['value']["applyElasticity"]

        $event['products']

        let ctrl =  this.lenta.controls.filter(d=>(d.get('account_name')?.value == this.currentProduct))
        ctrl = ctrl.filter(d=>this.isCheckBoxModel( $event['products'], d.get('product_group')?.value))
        // ctrl[0].controls.product_group.value

        ctrl.forEach(c=>{
            let patch = {}
            if($event['metric'] == 'Cogs'){
            //  patch['disable_cogs'] =  $event.checked
            patch['cogs_date'] = $event['value']["applyDate"]
            patch["inc_cogs"] =  $event['value']["applyElasticity"]   
 
            }
            else if($event['metric'] == 'List price'){
                // debugger
                // let base = c.value['list_price']
                // let percent =  
                patch['list_price_date'] = $event['value']["applyDate"]
                patch["inc_list_price"] =  $event['value']["applyElasticity"]            //  patch['disable_list_price'] =  $event.checked
 
            }else if($event['metric'] == 'Retail price'){
            //  patch['disable_rsp'] =  $event.checked
            patch['rsp_date'] = $event['value']["applyDate"]
            patch["inc_rsp"] =  $event['value']["applyElasticity"]     
 
            }else if($event['metric'] == 'Elasticity'){
             patch['disable_elasticity'] =  $event.checked
 
            }
            else{
             patch['disable_promo'] =  $event.checked
 
            }
            c.patchValue(patch)
        
        })
        // console.log(this.pricingForm.value , "ctrl vaues")
        this.modalService.close('apply-all-popup')
        
    }

    removeDate(index , v){
        let patch = {

        }
        if(v == 'list_price_date'){
            patch['list_price_date'] = null
        }
        else if(v == 'cogs_date'){
            patch['cogs_date'] = null
        }
        else if(v == 'rsp_date'){
            patch['rsp_date'] = null
        }
        
        // debugger
        this.lenta.at(index).patchValue(patch)

    }

    applyallOpen($event , product){
        // console.log($event , "event")
        // console.log(product , "product..")
        this.currentProduct = product
        this.currentProductGroup = [...this.currentProductGroup,...this.lenta.value.filter(
            d=>d.account_name == product).map(d=>({
            "value" : d.product_group , "checked" : true
        }))]
        this.currentProductGroup =[...new Set(this.currentProductGroup.map(v=>v.value))].map(e=>({"value" : e,"checked" : true}))
        // debugger
        // console.log(this.currentProductGroup , "currentproductgroup")
    
    //    let update =  this.lenta.value.find(d=>(d.account_name === product))

       let ctrl =  this.lenta.controls.filter(d=>(d.get('account_name')?.value == product))
    //    console.log(ctrl , "update form valus..")

       ctrl.forEach(c=>{
           let patch = {}
           if($event.value == 'Elasticity'){
                patch['follow_competition'] =  $event.checked
                
    
               }
        //    if($event.value == 'Cogs'){
        //     patch['disable_cogs'] =  $event.checked

        //    }
        //    else if($event.value == 'List price'){
        //     patch['disable_list_price'] =  $event.checked

        //    }else if($event.value == 'Retail price'){
        //     patch['disable_rsp'] =  $event.checked

        //    }else if($event.value == 'Elasticity'){
        //     patch['follow_competition'] =  $event.checked
        //     // return

        //    }
        //    else{
        //     patch['disable_promo'] =  $event.checked

        //    }
           c.patchValue(patch)
       
       })
    //    debugger
       
        if($event.checked){
            this.applyAllMetric = $event.value
            if($event.value != 'Elasticity'){
               
                this.sendMessage('apply-all-popup')

            }
           
        }
        
        // sendMessage()"

    }

    fileUpload($event){
        console.log($event , "iploadfile even")
        this.uploaded_file = $event
        
    }
    uploadFile(){
        this.pricingService.uploadWeeklyPricing(this.uploaded_file).subscribe(data=>{
            console.log(data , "uploaded file data return")
            if(data){
                data.forEach(element => {

                    let ctrl =  this.lenta.controls.find(d=>(d.get('account_name')?.value == element['Account name']) &&
                    (d.get('product_group')?.value == element['Product group']))

                    ctrl?.patchValue({
                        
                        inc_cogs : element['Inc COGS %'],
                        inc_list_price :  element['Inc List Price %'],
                        inc_rsp : element['Inc Retail Price %']
    
    
                    })

                    
                
                })

            }

           
            
        })
 }

    sendMessage(modalType: string): void {
        this.modalEvent.emit(modalType);
    }
    subProductSelectEvent(event){
        console.log(event , "sub product event...")
        this.selected_sub_product = event
        this.currentProduct = this.selected_main_product + this.selected_sub_product
        // console.log(this.selected_sub_product , "selected sub product")
    }
    selectMainProduct(product){
        this.selected_main_product = product
        // console.log(this.selected_main_product , "selected main product...")
    }
    onTabChanged(e){
        this.selected_main_product = this.displayProduct[e.index]
        this.currentProduct = this.selected_main_product + this.selected_sub_product
        // console.log(this.displayProduct[e.index] , "display producr") 
        // e.index
        // console.log(e, "tab event...")
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

    load_scenario_event($event){
        this.modalService.close('load-scenario-pricingtool-popup')
        this.chosen_promotion = $event as ListPromotion
       this.loadScenarioEvent.emit($event)
    }
    clearFormArray = (formArray: FormArray) => {
        formArray = this.formBuilder.array([]);
      }
      _updatePromoPriceVar(e:PricingModel , form){
          if(e.tpr_discount){
form['promo_price'] = form['promo_price'] +  utils.reducePercent(e.list_price , e.tpr_discount)
form['promo_price_count'] = form['promo_price_count'] + 1
          }
          
      }
      _populateForm(form){
          Object.values(form).forEach((e:any)=>{
              this.lenta.push(this.formBuilder.group({
                retailer : [e.retailer],
                account_name : [e.account_name],
                product_group : [e.product_group],
                list_price: [Number((utils._divide(e.list_price ,e.list_price_count )).toFixed(2))],
                inc_list_price : [0],
                cogs: [Number(utils._divide(e.cogs ,e.cogs_count )).toFixed(2)],
                inc_cogs: [0],
                elasticity : [Number((e.elasticity).toFixed(2))],
                net_elasticity : [Number((e.net_elasticity).toFixed(2))],
                inc_net_elasticity : [Number((e.net_elasticity).toFixed(2))],
                inc_elasticity : [Number((e.elasticity).toFixed(2))],
                rsp: [Number((utils._divide(e.rsp ,e.rsp_count )).toFixed(2))],
                promo_price : [Number((utils._divide(e.promo_price ,e.promo_price_count )).toFixed(2))],
                inc_promo_price : [0],
                inc_rsp: [0],
                follow_competition: [false],
                list_price_date :[null],
                cogs_date :[null],
                rsp_date :[null],
                disable_list_price : [false],
                disable_cogs : [false],
                disable_rsp : [false],
                disable_elasticity : [false],
                disable_promo : [false]


              }))
          })
      }

    groupPricing(){
        
        console.log(this.pricingArray , "pricing Array...")
        this.unique_retailers = []
       this.lenta.clear()
    
let form={

}
        this.pricingArray.forEach(e=>{
            let retailer = e.account_name + e.product_group
            if(retailer in form){
                form[retailer]["list_price"] = form[retailer]["list_price"] +  e.list_price ,
                form[retailer]["list_price_count"]  = form[retailer]["list_price_count"] + 1,
                form[retailer]["cogs"]  = form[retailer]["cogs"]+ e.cogs,
                form[retailer]["cogs_count"] = form[retailer]["cogs_count"] + 1,
                form[retailer]["rsp"]  = form[retailer]["rsp"]  +  e.retail_median_base_price_w_o_vat,
                form[retailer]["rsp_count"]  =  form[retailer]["rsp_count"]+ 1
            }
            else{
            form[retailer] = {
                "list_price" : e.list_price ,
                "list_price_count" : 1,
                "cogs" : e.cogs,
                "cogs_count" : 1,
                "rsp" : e.retail_median_base_price_w_o_vat,
                "rsp_count" : 1,
                "elasticity" : e.base_price_elasticity,
                "net_elasticity" : e.net_elasticity,
                "promo_price" : 0,
                "promo_price_count" : 0,
                "retailer" : e.account_name + e.product_group,
                "account_name" : e.account_name,
                "product_group" : e.product_group,
            }    
            }
            this._updatePromoPriceVar(e, form[retailer])
           
        

             
            e.date = new Date(e.date)
          
            let arr = this.lenta
        //     if(arr.length > 0){
        //    if(arr.length > 0 && !arr.value.find(d=>(d.product_group === e.product_group) && (d.account_name == e.account_name))){
               
             
        //     arr.push(
        //          this.formBuilder.group({
        //             retailer : [e.account_name + e.product_group],
        //             account_name : [e.account_name],
        //             product_group : [e.product_group],
        //             list_price: [Number((e.list_price).toFixed(2))],
        //             inc_list_price : [0],
        //             cogs: [Number(e.cogs).toFixed(2)],
        //             inc_cogs: [0],
        //             elasticity : [Number((e.base_price_elasticity).toFixed(2))],
        //             net_elasticity : [Number((e.net_elasticity).toFixed(2))],
        //             inc_net_elasticity : [Number((e.net_elasticity).toFixed(2))],
        //             inc_elasticity : [Number((e.base_price_elasticity).toFixed(2))],
        //             rsp: [Number((e.retail_median_base_price_w_o_vat).toFixed(2))],
        //             inc_rsp: [0],
        //             follow_competition: [false],
        //             list_price_date :[null],
        //             cogs_date :[null],
        //             rsp_date :[null],
        //             disable_list_price : [false],
        //             disable_cogs : [false],
        //             disable_rsp : [false],
        //             disable_elasticity : [false],
        //             disable_promo : [false]

        //          })
        //        )

        //    }
                

        //     }
        //     else{
        //         this.lenta.push(this.formBuilder.group({
        //             retailer : [e.account_name + e.product_group],
        //             account_name : [e.account_name],
        //             product_group : [e.product_group],
        //             list_price: [Number((e.list_price).toFixed(2))],
        //             inc_list_price : [0],
        //             cogs: [Number(e.cogs).toFixed(2)],
        //             inc_cogs: [0],
        //             elasticity : [Number((e.base_price_elasticity).toFixed(2))],
        //             net_elasticity : [Number((e.net_elasticity).toFixed(2))],
        //             inc_net_elasticity : [Number((e.net_elasticity).toFixed(2))],
        //             inc_elasticity : [Number((e.base_price_elasticity).toFixed(2))],
        //             rsp: [Number((e.retail_median_base_price_w_o_vat).toFixed(2))],
        //             inc_rsp: [0],
        //             follow_competition: [false],
        //             list_price_date :[null],
        //             cogs_date :[null],
        //             rsp_date :[null],
        //             disable_list_price : [false],
        //             disable_cogs : [false],
        //             disable_rsp : [false],
        //             disable_elasticity : [false],
        //             disable_promo : [false]


        //         }))
                
        //     }
            
        })
        this._populateForm(form)
        console.log(form , "formpromopriceinclusion")
        // debugger
        if(this.chosen_promotion){
            (this.chosen_promotion.meta as MetaInfo[]).forEach(m=>{
                // d.retailer d.product_group
                // debugger
               let ctrl =  this.lenta.controls.find(d=>(d.get('account_name')?.value == m.retailer) &&
                (d.get('product_group')?.value == m.product_group))
                console.log(ctrl , "contol chosen")

                // debugger
                console.log(moment(m.list_price_date , "YYYY-MM-dd") , "date functions")
                console.log(moment(m.cogs_date , "YYYY-MM-dd") , "date functions")
                console.log(moment(m.rsp_date , "YYYY-MM-dd") , "date functions")
                // console.log(moment(m.list_price_date , "YYYY-MM-dd") , "date functions")
                // list_price_date : m.list_price_date ? new Date(m.list_price_date) : m.list_price_date,
                // cogs_date :m.cogs_date ? new Date(m.cogs_date) : m.cogs_date,
                // rsp_date :m.rsp_date ? new Date(m.rsp_date) : m.rsp_date,
            
                ctrl?.patchValue({
                    list_price_date : m.list_price_date ? moment(m.list_price_date , "YYYY-MM-dd"):m.list_price_date,
                    cogs_date :m.cogs_date ? moment(m.cogs_date, "YYYY-MM-dd") :m.cogs_date,
                    rsp_date :m.rsp_date ? moment(m.rsp_date, "YYYY-MM-dd"): m.rsp_date,
                    inc_cogs : (m.pricing as PricingPromoModel).cogs,
                    inc_list_price : (m.pricing as PricingPromoModel).lpi,
                    inc_rsp : (m.pricing as PricingPromoModel).rsp


                })

            })
            // let ret = (this.chosen_promotion.meta as MetaInfo[]).find(d=>d.retailer == e.account_name && d.product_group == e.product_group)
        }
       
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
      


    }
    
   
    simulatePrice(){
        this.simulateResetEvent.emit({
            "type" : 'simulate',
            'data' : this.pricingForm.value
        })

    }
   
    getTabLength(){
        // debugger
        var itemsLength = $(".mat-tab-label").length;
        var itemSize = $(".mat-tab-label").outerWidth(true);
        var getMenuSize  = itemsLength * itemSize!
        var getMenuWrapperSize =  $(".mat-tab-label-container").outerWidth();
        console.log(itemsLength, "itemsLength")
        console.log(itemSize, "itemSize")
        if(getMenuSize > getMenuWrapperSize!){
            $(".mat-tab-header-pagination").css('display' , 'flex')
        }
        else{
            $(".mat-tab-header-pagination").css('display' , 'none')
        }
        

        // mat-tab-header-pagination-chevron
        // mat-tab-header-pagination-chevron
        // console.log(getMenuWrapperSize , "menu wrapper ")
        // console.log(getMenuSize , "get menu size...")
    }
    ngAfterViewInit() {
        this.getTabLength()
        // this.accordion.openAll()
        
    }

    ngOnInit() {
        
        

        this.pricingForm.valueChanges.subscribe(data=>{
            // console.log(data , "values changes form prcing form....")
        })
    }
    ngOnChanges(changes : SimpleChanges) :void{
        for (let property in changes) {
            if (property === 'pricingArray') {
                this.pricingArray = changes[property].currentValue
                this.groupPricing()

            }
            // if (property === 'count_ret') {
            //     console.log(changes[property].currentValue , "count_ret")
            //     // this.pricingArray = changes[property].currentValue
            //     // this.groupPricing()

            // }
    }
    }
}
