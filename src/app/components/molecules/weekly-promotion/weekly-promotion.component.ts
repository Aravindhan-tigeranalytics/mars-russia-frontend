import { Component,Input,OnInit } from '@angular/core';
import {ProductWeek} from "../../../core/models"
import { Observable, of, from, BehaviorSubject, combineLatest } from 'rxjs';
@Component({
    selector: 'nwn-weekly-promotion',
    templateUrl: './weekly-promotion.component.html',
    styleUrls: ['./weekly-promotion.component.css'],
})
export class WeeklyPromotionComponent implements OnInit {
     
    @Input()
    product_week:ProductWeek = null as any;
    singleSelect: any = [];
    config = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        search: true,
        placeholder: 'Add promotion',
    };
    @Input()
    optionsWeeklyPromotion: any[] = [];

    ngOnInit(){
       
        // console.log(this.year_quater , "year quater")
        // console.log(this.product_week , "promo week")
    }

    constructor() {}

    // ngOnInit() {}

   
}
