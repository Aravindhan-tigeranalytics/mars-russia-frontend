import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-filter-item',
    templateUrl: './filter-item.component.html',
    styleUrls: ['./filter-item.component.css'],
})
export class FilterItemComponent {
    @Input()
    nwnSvgIcon = 'retailers';
    @Input()
    type = 'stroke';
    @Input()
    size: string | 'smallValue' | 'largeValue' = 'largeValue';
    @Input()
    hideClose: boolean = true;
    @Input()
    hideFilterIcon: boolean = false;
}
