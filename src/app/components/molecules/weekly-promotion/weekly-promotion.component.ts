import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'nwn-weekly-promotion',
    templateUrl: './weekly-promotion.component.html',
    styleUrls: ['./weekly-promotion.component.css'],
})
export class WeeklyPromotionComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    singleSelect: any = [];
    config = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        search: true,
        placeholder: 'Add promotion',
    };
    @Input()
    optionsWeeklyPromotion: any[] = [];
}
