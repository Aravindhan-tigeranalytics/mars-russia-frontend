import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-week-item',
    templateUrl: './week-item.component.html',
    styleUrls: ['./week-item.component.css'],
})
export class WeekItemComponent {
    @Input()
    type: string | 'defaultWeek' | 'compulsoryWeek' | 'disabledWeek' = 'defaultWeek';
}
