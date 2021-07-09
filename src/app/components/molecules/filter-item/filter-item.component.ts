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
}
