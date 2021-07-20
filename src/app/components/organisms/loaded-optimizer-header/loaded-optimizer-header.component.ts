import { Component, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'nwn-loaded-optimizer-header',
    templateUrl: './loaded-optimizer-header.component.html',
    styleUrls: ['./loaded-optimizer-header.component.css'],
})
export class LoadedOptimizerHeaderComponent implements OnInit {
    @Output()
    modalEvent = new EventEmitter<string>();

    sendMessage(modalType: string): void {
        this.modalEvent.emit(modalType);
    }

    // sho and hide more action menu
    isShowDivIf = true;

    toggleDisplayDivIf() {
        this.isShowDivIf = !this.isShowDivIf;
    }

    // expand and collapse
    isExpand = true;
    expandHeader() {
        this.isExpand = !this.isExpand;
    }

    ngOnInit() {}

    // drag and drop
    checkboxMetrices = [
        {
            checkHeadValue: 'x0.50',
            checkboxLabel: 'MAC',
            disabled: false,
        },
        {
            checkHeadValue: 'x0.75',
            checkboxLabel: 'Retailer profit',
            disabled: false,
        },
        {
            checkHeadValue: 'x1.50',
            checkboxLabel: 'Trade expense',
            disabled: false,
        },
        {
            checkHeadValue: 'x1.25',
            checkboxLabel: 'MAC, % NSV',
            disabled: false,
        },
        {
            checkHeadValue: 'x1.00',
            checkboxLabel: 'RP, % RSV',
            disabled: false,
        },
    ];

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.checkboxMetrices, event.previousIndex, event.currentIndex);
    }

    onRoleChangeCheckbox(ev, index) {
        this.checkboxMetrices[index].disabled = !ev;
        console.log(this.checkboxMetrices);
    }

    // select config
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

    options1 = [
        {
            _id: 'N230%(Co30%)',
            index: 0,
            name: 'N+2-30% (Co-30%)',
        },
        {
            _id: 'N230%(Co30%)s',
            index: 1,
            name: 'N+2-30% (Co-30%)',
        },
        {
            _id: 'N230%(Co30%)a',
            index: 1,
            name: 'N+2-30% (Co-30%)',
        },
    ];
    options2 = [
        {
            _id: 'N230%(Co30%)1',
            index: 0,
            name: 'N+2-30% (Co-30%)1',
        },
        {
            _id: 'N230%(Co30%)s2',
            index: 1,
            name: 'N+2-30% (Co-30%)2',
        },
        {
            _id: 'N230%(Co30%)a3',
            index: 1,
            name: 'N+2-30% (Co-30%)3',
        },
    ];
    options3 = [
        {
            _id: 'N230%(Co30%)2',
            index: 0,
            name: 'N+2-30% (Co-30%)2',
        },
        {
            _id: 'N230%(Co30%)s2',
            index: 1,
            name: 'N+2-30% (Co-30%)4',
        },
        {
            _id: 'N230%(Co30%)a3',
            index: 1,
            name: 'N+2-30% (Co-30%)3',
        },
    ];
}
