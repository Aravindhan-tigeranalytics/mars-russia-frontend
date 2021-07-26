import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'nwn-compare-scenario-popup',
    templateUrl: './compare-scenario-popup.component.html',
    styleUrls: ['./compare-scenario-popup.component.css'],
})
export class CompareScenarioPopupComponent implements OnInit {
    constructor(private _location: Location) {}

    public screenWidth: any;
    public screenHeight: any;

    ngOnInit(): void {
        this.screenWidth = window.innerWidth - 2;
        this.screenHeight = window.innerHeight;
    }
    openTab = 1;
    toggleTabs($tabNumber: number): void {
        this.openTab = $tabNumber;
    }
    backClicked() {
        this._location.back();
    }
}
