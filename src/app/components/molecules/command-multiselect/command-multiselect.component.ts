import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'nwn-command-multiselect',
    templateUrl: './command-multiselect.component.html',
    styleUrls: ['./command-multiselect.component.css'],
})
export class CommandMultiselectComponent {
    @Input()
    closeButton: boolean = false;
}
