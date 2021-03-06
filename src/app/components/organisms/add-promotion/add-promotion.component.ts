import { Component, Input, OnInit } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {OptimizerService} from '../../../core/services/optimizer.service'
import {CheckboxModel} from '../../../core/models'
import { tickStep } from 'd3-array';
@Component({
    selector: 'nwn-add-promotion',
    templateUrl: './add-promotion.component.html',
    styleUrls: ['./add-promotion.component.css'],
})
export class AddPromotionComponent implements OnInit {
    constructor(private optimize : OptimizerService,){

    }
    promo_generated = ''
    input_promotions:Array<CheckboxModel> = []
    base_line_promotions:Array<CheckboxModel> = []

    form = new FormGroup({
        promo: new FormControl('', []),
        tpr:new FormControl(0,[]),
        co_inv : new FormControl(0,[])
      });
    @Input()
    valueDiscountdepth = 0;

    @Input()
    valueCoInvestment = 0;

    @Input()
    discountdepth: Options = {
        floor: 0,
        ceil: 100,
        showSelectionBar: true,
        translate: (value: number, label: LabelType): string => {
            this.form.controls['tpr'].setValue(value);
            switch (label) {
                case LabelType.Ceil:
                    return value + ' %';
                case LabelType.Floor:
                    return value + ' %';
                default:
                    return '' + value;
            }
        },
    };
    coInvestment: Options = {
        floor: 0,
        ceil: 100,
        showSelectionBar: true,
        translate: (value: number, label: LabelType): string => {
            this.form.controls['co_inv'].setValue(value);
             
            switch (label) {
                case LabelType.Ceil:
                    return value + ' %';
                case LabelType.Floor:
                    return value + ' %';
                default:
                    return '' + value;
            }
        },
    };
    get f(){
        return this.form.controls;
      }
    promo_name = ['motivation' , 'N+1' , 'Promo depth']
    ngOnInit(){
this.form.valueChanges.subscribe(data=>{
    // console.log(data , "form changes subscription")
    let name  = data.promo + " " + "TPR-" + data.tpr + "% " + "CoInv-" + data.co_inv + "%"
    setTimeout(()=>{
        this.promo_generated = name

    },500)
    
    console.log(name , "name of label")
    this.base_line_promotions = this.optimize.get_base_line_promotions().map(e=>({"value" : e,"checked" : false}))
    console.log(this.base_line_promotions , "base line promotions")
})
    }
    valueChangePromo(e:any){
        console.log(e.value , "promo value selected")
    

    }
    valueChangeBaseline(e:any){
        this.input_promotions.push({"value" : "TPR-"+e.value+"%" , "checked" : e.checked})
        console.log(this.input_promotions , "input promotions ")
        // debugger
        this.base_line_promotions = this.base_line_promotions.filter(val=>val.value!=e.value)
        // this.base_line_promotions.indexOf()
        console.log(e.value , "base line promo value")

    }
    applyPromotion(){
        let val = this.input_promotions.map(e=>e.value)
        console.log(val , "val genetratefd")
        this.optimize.setPromotionObservable(val)
     console.log(this.input_promotions , "input promotions ")   
    }

    addPromotions(){
        this.input_promotions.push({"value" : this.promo_generated , "checked" : false})
        this.valueCoInvestment = 0
        this.valueDiscountdepth = 0
        this.form.reset()
        
        // console.log(this.promo_generated , "promotion generated")
    }
    changePromotion(e:any){
        this.form.controls['promo'].setValue(e.target.value);
        console.log(e.target.value , "selected value");
        console.log(this.form.value , "fomr value")

    }
}
