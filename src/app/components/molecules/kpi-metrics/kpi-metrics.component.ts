import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'nwn-kpi-metrics',
    templateUrl: './kpi-metrics.component.html',
    styleUrls: ['./kpi-metrics.component.css'],
})
export class KpiMetricsComponent implements OnInit, AfterViewInit {
    translate_y: string = '';
    currentTranslateRate: string = '';
    constructor(private elRef: ElementRef) {}

    public kpiTableWidth: any;
    public kpiTableHeight: any;

    ngOnInit(): void {
        this.kpiTableWidth = window.innerWidth - 155;
        this.kpiTableHeight = window.innerHeight - 250;
    }

    @ViewChild('kpiTableScroll', { static: false }) kpiTableScroll: any;
    scrolling_table: any;

    ngAfterViewInit() {
        // this.slider = this.elRef.nativeElement.querySelector('.slide');
        this.scrolling_table = this.elRef.nativeElement.querySelector('.kpiTableScroll');
        this.scrolling_table.addEventListener('scroll', this.freeze_pane_listener(this.scrolling_table));
    }

    freeze_pane_listener(what_is_this: { scrollTop: string; scrollLeft: string }) {
        return () => {
            var i;
            var self = this;
            self.translate_y = '';

            var translate_y = 'translate(0px,' + what_is_this.scrollTop + 'px)';
            var translate_x = 'translate(' + what_is_this.scrollLeft + 'px)';
            var translate_xy = 'translate(' + what_is_this.scrollLeft + 'px,' + what_is_this.scrollTop + 'px)';

            self.currentTranslateRate = what_is_this.scrollLeft;

            var fixed_vertical_elts = document.getElementsByClassName(
                'freeze_vertical',
            ) as HTMLCollectionOf<HTMLElement>;
            var fixed_horizontal_elts = document.getElementsByClassName(
                'freeze_horizontal',
            ) as HTMLCollectionOf<HTMLElement>;
            var fixed_both_elts = document.getElementsByClassName('freeze') as HTMLCollectionOf<HTMLElement>;

            for (i = 0; i < fixed_horizontal_elts.length; i++) {
                // fixed_horizontal_elts[i].style.webkitTransform = translate_x;
                fixed_horizontal_elts[i].style.transform = translate_x;
            }
            for (i = 0; i < fixed_vertical_elts.length; i++) {
                // fixed_vertical_elts[i].style.webkitTransform = translate_y;
                fixed_vertical_elts[i].style.transform = translate_y;
            }
            for (i = 0; i < fixed_both_elts.length; i++) {
                // fixed_both_elts[i].style.webkitTransform = translate_xy;
                fixed_both_elts[i].style.transform = translate_xy;
            }
        };
    }
    singleSelect: any = [];
    config = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        search: false,
    };
    totalValue = [
        {
            _id: 'totalvalue',
            index: 0,
            name: 'Total value',
        },
        {
            _id: 'perton',
            index: 1,
            name: 'Per ton',
        },
        {
            _id: 'oerunit',
            index: 1,
            name: 'Per unit',
        },
    ];
    optionMetrics = [
        {
            _id: 'totalvalue',
            index: 0,
            name: 'Total value',
        },
        {
            _id: 'perton',
            index: 1,
            name: 'Per ton',
        },
        {
            _id: 'oerunit',
            index: 1,
            name: 'Per unit',
        },
    ];
}
