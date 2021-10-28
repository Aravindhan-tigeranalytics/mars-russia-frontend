import { Component, OnInit , Input,SimpleChanges, Output , EventEmitter } from '@angular/core';
import { CheckboxModel, HierarchyCheckBoxModel, Product } from '@core/models';

@Component({
  selector: 'nwn-add-new-pricingtool-popup',
  templateUrl: './add-new-pricingtool-popup.component.html',
  styleUrls: ['./add-new-pricingtool-popup.component.css']
})
export class AddNewPricingtoolPopupComponent implements OnInit {

  searchText  = ''

  @Input()
  heading = 'Add more'

  @Input()
  hierarchy_model : Array<HierarchyCheckBoxModel> = []

  @Input()
  retailers : Array<CheckboxModel> = []

  @Input()
  product : Array<Product> = []

  @Input()
  product_group : Array<CheckboxModel> = []

  @Output()
  retailerChange = new EventEmitter()

  @Output()
  productChange = new EventEmitter()

  @Output()
  filterApply  = new EventEmitter()

  // Product groups

  constructor() { }

  ngOnInit(): void {
  }

  inputChangeEvent($event){
    this.searchText = $event
  }

  valueChangeSelect(event:any){
    this.productChange.emit(event)
  //  console.log(event , "value change event..")
   
  }
  valueChangeSelectProduct(event:any , retailer){

    this.productChange.emit(
     {"product" : event , "retailer" : retailer}
    )
    // console.log(retailer , "retailer value mapping")
    // console.log(event , "value change product")
  }
  apply(){
    this.filterApply.emit({
      "key" : "Product groups"
    })
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
