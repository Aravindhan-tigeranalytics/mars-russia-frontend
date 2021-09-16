import { Component, OnInit } from '@angular/core';
// import { IMyDpOptions } from 'mydatepicker';

@Component({
    selector: 'nwn-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    // public myDatePickerOptions: IMyDpOptions = {
    //     // other options...
    //     dateFormat: 'dd.mm.yyyy',
    // };

    // // Initialized to specific date (09.10.2018).
    // public model: any = { date: { year: 2018, month: 10, day: 9 } };
}
