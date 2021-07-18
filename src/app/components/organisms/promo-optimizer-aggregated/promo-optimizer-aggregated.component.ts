import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'nwn-promo-optimizer-aggregated',
    templateUrl: './promo-optimizer-aggregated.component.html',
    styleUrls: ['./promo-optimizer-aggregated.component.css'],
})
export class PromoOptimizerAggregatedComponent implements OnInit, AfterViewInit {
    translate_y: string = '';
    currentTranslateRate: string = '';
    constructor(private elRef: ElementRef) {}

    public weeklyTableWidth: any;
    public weeklyTableHeight: any;

    ngOnInit(): void {
        this.weeklyTableWidth = window.innerWidth - 155;
        this.weeklyTableHeight = window.innerHeight - 150;
    }

    @ViewChild('weekly', { static: false }) weekly: any;
    scrolling_table: any;

    ngAfterViewInit() {
        // this.slider = this.elRef.nativeElement.querySelector('.slide');
        this.scrolling_table = this.elRef.nativeElement.querySelector('.weeklyOptimizertable');
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
    optionsNormal = [
        {
            _id: '3years',
            index: 0,
            balance: '$2,806.37',
            picture: 'http://placehold.it/32x32',
            name: '3 years',
        },
        {
            _id: '1year',
            index: 1,
            balance: '$2,984.98',
            picture: 'http://placehold.it/32x32',
            name: '1 years',
        },
        {
            _id: '2year',
            index: 1,
            balance: '$2,984.98',
            picture: 'http://placehold.it/32x32',
            name: '2 years',
        },
    ];

    openTab = 1;
    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;
    }
}
