import { Component, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'nwn-loaded-pricing-scenario-header',
    templateUrl: './loaded-pricing-scenario-header.component.html',
    styleUrls: ['./loaded-pricing-scenario-header.component.css'],
})
export class LoadedPricingScenarioHeaderComponent implements OnInit {
    selectedIndex!: number;
    constructor() {}

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

    products: any[] = [
        {
            productName: 'Walmart',
        },
        {
            productName: 'Target',
        },
        {
            productName: 'Kohl’s',
        },
        {
            productName: 'Home Depot',
        },
        {
            productName: 'Publix',
        },
        {
            productName: 'Dollar Tree',
        },
        {
            productName: 'Costco',
        },
        {
            productName: 'Target',
        },
    ];

    productItems: any[] = [
        {
            productItemName: 'Milkyway XXL',
        },
        {
            productItemName: 'Skittles XXL',
        },
        {
            productItemName: 'Juicy Fruit XXL',
        },
        {
            productItemName: 'Bounty XXL',
        },
        {
            productItemName: 'Orbit XXL',
        },
        {
            productItemName: 'Skittles XXL',
        },
        {
            productItemName: 'Juicy Fruit XXL',
        },
        {
            productItemName: 'Bounty XXL',
        },
    ];

    select(index: number) {
        this.selectedIndex = index;
    }

    openTab = 1;
    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;
    }

    ngOnInit() {}
}
