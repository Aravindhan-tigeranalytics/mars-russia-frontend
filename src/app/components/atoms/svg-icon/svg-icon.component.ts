import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-svg-icon',
    templateUrl: './svg-icon.component.html',
    styleUrls: ['./svg-icon.component.css'],
})
export class SvgIconComponent {
    @Input()
    size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';

    @Input()
    type: 'stroke' | 'fill' | 'fill-stroke' = 'stroke';

    @Input()
    class = '';

    @Input()
    nwnSvgIcon:
        | 'logout'
        | 'simulator'
        | 'optimizer'
        | 'pricing-capabilities'
        | 'pricing-tool'
        | 'profit-tool'
        | 'promo-tool'
        | 'srm-insight'
        | 'close'
        | 'clock'
        | 'retailers'
        | 'categories'
        | 'strategic-cells'
        | 'brands'
        | 'brand-formats'
        | 'product-groups'
        | 'info'
        | 'minus'
        | 'plus'
        | 'upload'
        | 'download'
        | 'tickmark'
        | 'lightning-bolt'
        | 'save'
        | 'save-download'
        | 'more-horizontal'
        | 'chevron-up'
        | 'chevron-down'
        | 'copy' = 'logout';
}
