import { Component,Input,OnInit } from '@angular/core';
import {ProductWeek} from "../../../core/models"
@Component({
    selector: 'nwn-weekly-promotion',
    templateUrl: './weekly-promotion.component.html',
    styleUrls: ['./weekly-promotion.component.css'],
})
export class WeeklyPromotionComponent implements OnInit {
     
    @Input()
    product_week:ProductWeek = null as any;

    ngOnInit(){
       
        // console.log(this.year_quater , "year quater")
        // console.log(this.product_week , "promo week")
    }

}
