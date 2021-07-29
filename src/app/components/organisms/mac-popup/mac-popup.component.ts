import { Component,Input } from '@angular/core';

@Component({
    selector: 'nwn-mac-popup',
    templateUrl: './mac-popup.component.html',
    styleUrls: ['./mac-popup.component.css'],
})
export class MacPopupComponent {

    @Input()
    label = ""
}
