import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-legend-items',
    templateUrl: './legend-items.component.html',
    styleUrls: ['./legend-items.component.css'],
})
export class LegendItemsComponent {
    @Input()
    nwnLegendItems: string | 'onesquare' | 'twosquare' | 'triangle-tr' = 'onesquare';
    @Input()
    type: string | 'squaresm' | 'squarelg' | 'triangletr' = 'squaresm';
    @Input()
    color: string | 'bg-gray-500' | 'border-gray-500' | 'bgLBlue-100' | 'bgLBlue-200' | 'bgLBlue-300' = 'bg-gray-500';
    @Input()
    colorVariantFirst: string | 'bgGreenAccent' | 'bgRed-600' = 'bgGreenAccent';
    @Input()
    colorVariantSecond: string | 'bgGreenAccent' | 'bgRed-600' = 'bgGreenAccent';
}
