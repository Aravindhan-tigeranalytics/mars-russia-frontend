import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
    @Input()
    size: 'sm' | 'lg' | 'iconsm' | 'iconlg' = 'lg';

    @Input()
    type: 'primary' | 'secondary' | 'link' | 'transparent' | 'icon' = 'primary';

    @Input()
    disabled: boolean = false;

    @Input()
    href = '';

    @Input()
    class = '';
}
