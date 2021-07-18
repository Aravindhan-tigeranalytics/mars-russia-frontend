import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'nwn-metric-item',
    templateUrl: './metric-item.component.html',
    styleUrls: ['./metric-item.component.css'],
})
export class MetricItemComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    @Input()
    nwnMetricItem: string | 'defaultRight' | 'defaultTop' | 'multipleValues' | 'checkboxMetric' = 'defaultRight';

    @Input()
    showRightValue: boolean = false;
    @Input()
    showDrad: boolean = false;
}
