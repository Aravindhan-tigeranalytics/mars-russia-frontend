import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nwn-upload-weekly-promotions',
  templateUrl: './upload-weekly-promotions.component.html',
  styleUrls: ['./upload-weekly-promotions.component.css']
})
export class UploadWeeklyPromotionsComponent implements OnInit {
  isButtonDisabled: boolean = true
  isUploadClicked: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  receiveMessage($event: any) {
    console.log('recieved',$event);
    if($event == 'file-selected'){
      this.isButtonDisabled = false
    }
    else if($event == 'invalid-file'){
      this.isButtonDisabled = true
    }
  }

  uploadFile(){
    this.isUploadClicked = true
  }

}
