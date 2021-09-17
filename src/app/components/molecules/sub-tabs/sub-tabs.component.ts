import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'nwn-sub-tabs',
    templateUrl: './sub-tabs.component.html',
    styleUrls: ['./sub-tabs.component.css'],
})
export class SubTabsComponent implements OnInit {
    constructor() {
        // this.scrollable = any;
    }

    ngOnInit(): void {}
    // @ViewChild('scrollable-tabs-items', { static: false }) scrollable: ElementRef;

    // moveLeft(event) {
    //     this.scrollable.scrollLeft += 20;
    // }
}
