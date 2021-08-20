import { Component, EventEmitter, Input, OnInit,Output,SimpleChanges } from '@angular/core';
import { ProductWeek } from '@core/models';
import { ModalService } from '@molecules/modal/modal.service';

@Component({
    selector: 'nwn-user-guide-popup',
    templateUrl: './user-guide-popup.component.html',
    styleUrls: ['./user-guide-popup.component.css'],
})
export class UserGuidePopupComponent implements OnInit {
    imageObject = [{
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
        title: 'Hummingbirds are amazing creatures'
    }, {
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
    }, {
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
        title: 'Example with title.'
    },{
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
        title: 'Hummingbirds are amazing creatures'
    }, {
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg'
    }, {
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
        title: 'Example two with title.'
    }];
  
    constructor(public modalService: ModalService){}
    ngOnInit(){
    
    }

    closeModal(){
        this.modalService.close('user-guide-popup')
    }

}
