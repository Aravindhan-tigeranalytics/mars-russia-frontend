import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-command-search',
    templateUrl: './command-search.component.html',
    styleUrls: ['./command-search.component.css'],
})
export class CommandSearchComponent {
    @Input()
    placeholder = 'Search promo metrics';
    @Input()
    closesvgClass = 'absolute right-4 top-6 text-black stroke-current';
    @Input()
    hideClose: boolean = false;
}
