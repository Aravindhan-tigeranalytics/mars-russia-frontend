import { Component, OnInit , Input,SimpleChanges, Output , EventEmitter } from '@angular/core';
import { CheckboxModel, HierarchyCheckBoxModel, Product } from '@core/models';
import { SimulatorService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

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
  count_ret:any

  



  @Output()
  hier_null = new EventEmitter()

  @Output()
  productChange = new EventEmitter()

  @Output()
  filterApply  = new EventEmitter()

  // Product groups

  constructor(public restApi: SimulatorService,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.restApi.ClearScearchText.asObservable().subscribe(data=>{
      console.log(data,"from modal apply")
      this.searchText = ""
      if(data=="addnew-pricngtool"){
        console.log(this.count_ret , "count ret.........")

      }
    })
  }

  inputChangeEvent($event){
    this.searchText = $event
  }

  valueChangeSelect(event:any){
    this.productChange.emit(event)
  //  console.log(event , "value change event..")
   
  }
  validateHier(){
    let parent_valid = false
    let child_valid = false
    this.hierarchy_model.forEach(d=>{
      if(d.checked){
        parent_valid = true
        d.child.forEach(d=>{
          if(d.checked){
            child_valid = true

          }
        })
      }
    })
    if(!parent_valid){
      this.toastr.error("choose atleast one retailer")
      return

    }
    if(!child_valid){
      this.toastr.error("choose product for retailer")
      return
    }
   
    return parent_valid && child_valid
  }
  valueChangeSelectProduct(event:any , retailer){

    this.productChange.emit(
     {"product" : event , "retailer" : retailer}
    )
    // console.log(retailer , "retailer value mapping")
    // console.log(event , "value change product")
  }
  apply(){
    // console.log(this.hierarchy_model , "hiermodel")
    if(this.validateHier()){
      this.filterApply.emit({
      "key" : "Product groups"
    })

    }
    // this.filterApply.emit({
    //   "key" : "Product groups"
    // })
  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes , "changes")
 
     
}

}
