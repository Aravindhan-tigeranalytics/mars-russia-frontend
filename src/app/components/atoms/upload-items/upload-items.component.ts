import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { SimulatorService } from 'src/app/core/services/simulator.service';

@Component({
    selector: 'nwn-upload-items',
    templateUrl: './upload-items.component.html',
    styleUrls: ['./upload-items.component.css'],
})
export class UploadItemsComponent implements OnChanges {
    @Input()
    isUploadClicked: boolean = false;
    @Input()
    showLoadUpload: boolean = false;
    @Output()
    modalEvent = new EventEmitter<string>();
    
    reqData:any
    constructor(public restApi:SimulatorService){}

    sendMessage(modalType: string): void {
        this.modalEvent.emit(modalType);
    }

    onFileSelected() {
        const inputNode: any = document.querySelector('#simulatorInputFile');
        console.log(inputNode.files[0])
        let filename = inputNode.files[0].name
        var extension:any = filename.substr(filename.lastIndexOf('.'));
        if((extension.toLowerCase() == ".xlsx") || (extension.toLowerCase() == ".xls") || (extension.toLowerCase() == ".csv")){
          console.log("good to go")
          this.sendMessage('file-selected')
        //   this.toastr.success('File Uploaded Successfully!');
        }
        else{
            this.sendMessage('invalid-file')
        //   this.toastr.warning('Invalid File Format');
            return
        }
    
        const formdata = new FormData();
        formdata.append('simulator_input',inputNode.files[0])
        this.reqData = formdata
        // this.uploadFile(formdata)
      }

      uploadFile(){
        this.restApi.uploadPromoSimulateInput(this.reqData).subscribe((data: any) => {
            console.log(data)
            this.restApi.setSimulatorDataObservable(data)
        })
      }

      ngOnChanges(changes: SimpleChanges) {
        for (let property in changes) {
            if (property === 'isUploadClicked') {
              this.isUploadClicked = changes[property].currentValue
              if(this.isUploadClicked == true){
                  this.uploadFile()
              }
            }
        }
    }
}
