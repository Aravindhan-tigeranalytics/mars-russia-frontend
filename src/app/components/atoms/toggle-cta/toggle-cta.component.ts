import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-toggle-cta',
    templateUrl: './toggle-cta.component.html',
    styleUrls: ['./toggle-cta.component.css'],
})
export class ToggleCtaComponent {
    @Input()
    type: 'unselected' | 'selected' = 'unselected';
}
