import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-upload-items',
    templateUrl: './upload-items.component.html',
    styleUrls: ['./upload-items.component.css'],
})
export class UploadItemsComponent {
    @Input()
    showLoadUpload: boolean = false;
}
