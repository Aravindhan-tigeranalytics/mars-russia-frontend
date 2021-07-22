import { Component, Input } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
    selector: 'nwn-number-promo-waves',
    templateUrl: './number-promo-waves.component.html',
    styleUrls: ['./number-promo-waves.component.css'],
})
export class NumberPromoWavesComponent {
    @Input()
    minValue = 0;

    @Input()
    maxValue = 52;

    @Input()
    options: Options = {
        floor: 0,
        ceil: 52,
        showSelectionBar: true,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Ceil:
                    return value + ' weeks';
                case LabelType.Floor:
                    return value + ' weeks';
                default:
                    return '' + value;
            }
        },
    };
}
