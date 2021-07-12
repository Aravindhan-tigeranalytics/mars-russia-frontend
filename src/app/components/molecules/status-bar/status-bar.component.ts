import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-status-bar',
    templateUrl: './status-bar.component.html',
    styleUrls: ['./status-bar.component.css'],
})
export class StatusBarComponent {
    @Input()
    nwnStatusBar: 'yettobesimulated' | 'viewmore' | 'viewless' = 'yettobesimulated';
}
