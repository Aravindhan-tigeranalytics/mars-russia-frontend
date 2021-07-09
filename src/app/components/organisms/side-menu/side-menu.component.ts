import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
    @Input()
    href = '/';
}
