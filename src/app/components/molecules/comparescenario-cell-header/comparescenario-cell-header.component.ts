import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-comparescenario-cell-header',
    templateUrl: './comparescenario-cell-header.component.html',
    styleUrls: ['./comparescenario-cell-header.component.css'],
})
export class ComparescenarioCellHeaderComponent {
    @Input()
    showCHClose: boolean = false;
}
