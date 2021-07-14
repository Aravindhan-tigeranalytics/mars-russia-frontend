import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-search-footer',
    templateUrl: './search-footer.component.html',
    styleUrls: ['./search-footer.component.css'],
})
export class SearchFooterComponent {
    @Input()
    hideApply: boolean = false;
    @Input()
    hideBack: boolean = false;
    @Input()
    hideLoad: boolean = false;
}
