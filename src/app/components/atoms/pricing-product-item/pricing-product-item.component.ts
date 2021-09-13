import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-pricing-product-item',
    templateUrl: './pricing-product-item.component.html',
    styleUrls: ['./pricing-product-item.component.css'],
})
export class PricingProductItemComponent {
    @Input()
    type: 'default' | 'active' | 'filled' | 'filled-active' = 'default';
    @Input()
    size: 'sfi' = 'sfi';
    @Input()
    showClose: boolean = false;
}
