import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-command-multiselect',
    templateUrl: './command-multiselect.component.html',
    styleUrls: ['./command-multiselect.component.css'],
})
export class CommandMultiselectComponent {
    @Input()
    hideClose: boolean = false;
    @Input()
    leftBorder: boolean = false;
    @Input()
    cmdMultiselectHead: boolean = false;
    @Input()
    cmdMultiselectSub: boolean = false;
    @Input()
    disabled: boolean = false;
}
