import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'nwn-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    @Input()
    showLabel: boolean = false;
}
