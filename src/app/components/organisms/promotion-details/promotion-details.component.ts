import { Component, Input, OnInit } from '@angular/core';

import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
    selector: 'nwn-promotion-details',
    templateUrl: './promotion-details.component.html',
    styleUrls: ['./promotion-details.component.css'],
})
export class PromotionDetailsComponent implements OnInit {
    @Input()
    valueDiscountdepth = 0;

    @Input()
    valueCoInvestment = 0;

    @Input()
    discountdepth: Options = {
        floor: 0,
        ceil: 50,
        showSelectionBar: true,
        translate: (value: number, label: LabelType): string => {
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
        ceil: 50,
        showSelectionBar: true,
        translate: (value: number, label: LabelType): string => {
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
    optionsNormal = [
        {
            _id: 'trp',
            index: 0,
            name: 'TRP',
        },
        {
            _id: 'n1',
            index: 1,
            name: 'N+1',
        },
        {
            _id: '5a66d6c376be165a5a7fae33',
            index: 2,
            balance: '$2,794.16',
            picture: 'http://placehold.it/32x32',
            name: 'Amie Franklin',
        },
        {
            _id: 'n2',
            index: 3,
            name: 'N+2',
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
