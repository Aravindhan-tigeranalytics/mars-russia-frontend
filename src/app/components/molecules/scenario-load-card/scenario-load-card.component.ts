import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-scenario-load-card',
    templateUrl: './scenario-load-card.component.html',
    styleUrls: ['./scenario-load-card.component.css'],
})
export class ScenarioLoadCardComponent {
    @Input()
    showInfo: boolean = false;
    @Input()
    showTrash: boolean = false;
    @Input()
    showCheckbox: boolean = false;
    @Input()
    showSubHead: boolean = false;
    @Input()
    focus: boolean = false;
}
