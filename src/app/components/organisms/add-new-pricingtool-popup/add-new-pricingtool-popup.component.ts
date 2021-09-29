import { Component, OnInit , Input,SimpleChanges } from '@angular/core';
import { CheckboxModel, Product } from '@core/models';

@Component({
  selector: 'nwn-add-new-pricingtool-popup',
  templateUrl: './add-new-pricingtool-popup.component.html',
  styleUrls: ['./add-new-pricingtool-popup.component.css']
})
export class AddNewPricingtoolPopupComponent implements OnInit {

  @Input()
  retailers : Array<CheckboxModel> = []

  @Input()
  product : Array<Product> = []

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes , "changes")
 
    for (let property in changes) {
        if (property === 'retailers') {
          this.retailers =  changes[property].currentValue
          // console.log( changes[property].currentValue , "property changes")
            
           
        } 
    }
}

}
