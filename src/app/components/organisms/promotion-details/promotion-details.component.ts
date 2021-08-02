import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import * as Utils from "@core/utils"
import { CheckboxModel } from '@core/models';


@Component({
    selector: 'nwn-promotion-details',
    templateUrl: './promotion-details.component.html',
    styleUrls: ['./promotion-details.component.css'],
})
export class PromotionDetailsComponent implements OnInit {
    input_promotions:Array<CheckboxModel> = []

    form = new FormGroup({
        promo: new FormControl('', []),
        tpr:new FormControl(0,[]),
        co_inv : new FormControl(0,[])
      });
      promo_generated = ''
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

    singleSelect: any = [];
    config = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        search: true,
    };
    optionsNormal = ["Motivation","N+1","Traffic"
           ];

    constructor() {}

    ngOnInit(): void {
        this.form.valueChanges.subscribe(data=>{
            // console.log(data , "form changes subscription")
            // let promo = null
            let final = Utils.genratePromotion(
                data.promo == "Motivation" ? 1 : 0,
                data.promo == "N+1" ? 1 : 0,
                data.promo == "Traffic" ? 1 : 0,
             data.tpr,
             data.co_inv
            )
                 setTimeout(()=>{
                this.promo_generated = final
        
            },500)
            
            // console.log(name , "name of label")
             
        })
    }
    addPromotions(){
        if(this.promo_generated){
            if(!this.input_promotions.find(v=>v.value == this.promo_generated)){
                this.input_promotions.push({"value" : this.promo_generated , "checked" : false})


            }
           
        }
       
        this.valueCoInvestment = 0
        this.valueDiscountdepth = 0
        this.form.reset()
        
        // console.log(this.promo_generated , "promotion generated")
    }
}
