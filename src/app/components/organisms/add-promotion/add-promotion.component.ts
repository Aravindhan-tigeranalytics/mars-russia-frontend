import { Component, Input } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
    selector: 'nwn-add-promotion',
    templateUrl: './add-promotion.component.html',
    styleUrls: ['./add-promotion.component.css'],
})
export class AddPromotionComponent {
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
}
