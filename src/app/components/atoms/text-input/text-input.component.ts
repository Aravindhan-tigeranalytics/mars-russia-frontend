import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent {
    @Input()
    placeholder = 'Scenario name';

    @Input()
    nwnTextInput: string | 'text' | 'textarea' = 'text';

    @Input()
    error: boolean = false;
}
