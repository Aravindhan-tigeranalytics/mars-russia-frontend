import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'nwn-status-bar',
    templateUrl: './status-bar.component.html',
    styleUrls: ['./status-bar.component.css'],
})
export class StatusBarComponent {
    @Input()
    statusIconClass = 'text-white stroke-current';
}
