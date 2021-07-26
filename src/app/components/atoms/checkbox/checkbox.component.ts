import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'nwn-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    @Input()
    showLabel = false;

    @Input() checkboxData = false;
    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    onToggle(): void {
        const checkedOption = this.checkboxData;
        this.toggle.emit(checkedOption);
    }
}
