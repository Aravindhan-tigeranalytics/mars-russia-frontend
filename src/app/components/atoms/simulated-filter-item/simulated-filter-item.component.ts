import { Component, Input,OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'nwn-simulated-filter-item',
    templateUrl: './simulated-filter-item.component.html',
    styleUrls: ['./simulated-filter-item.component.css'],
})
export class SimulatedFilterItemComponent  implements OnInit{
    @Input()
    type: 'default' | 'active' | 'filled' | 'filled-active' = 'default';
    @Input()
    size: 'sfi' = 'sfi';
    @Input()
    key:string = ''
    @Input()
    selected_quarter:string=''
    ngOnInit(){
        if(this.key == this.selected_quarter){
            this.type = 'active'
        }
        else{
            this.type = 'default'
        }
       
    }
    ngOnChanges(changes : SimpleChanges) :void
    {
    //     if(!changes.selected_quarter.firstChange){
    //         if(this.key == changes.selected_quarter.currentValue){
    //             this.type = 'active'
    //         }
    //         else{
    //             this.type = 'default'
    //         }
            
    //     }
    //   console.log(changes , "updated value")
    }
}
