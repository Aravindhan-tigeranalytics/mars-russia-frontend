import { Component, OnInit,Input, ElementRef, ViewChild , Output , EventEmitter } from '@angular/core';

@Component({
    selector: 'nwn-sub-tabs',
    templateUrl: './sub-tabs.component.html',
    styleUrls: ['./sub-tabs.component.css'],
})
export class SubTabsComponent implements OnInit {

    @Input()
    products:any[] = []

    @Output()
    subProductSelectEvent = new EventEmitter()

    constructor() {
        // this.scrollable = any;
    }
    selectSubProduct(product){
        this.subProductSelectEvent.emit(product)

    }

    ngOnInit(): void {}
    // @ViewChild('scrollable-tabs-items', { static: false }) scrollable: ElementRef;

    // moveLeft(event) {
    //     this.scrollable.scrollLeft += 20;
    // }
}
