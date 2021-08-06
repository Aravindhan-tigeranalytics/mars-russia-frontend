import { Component, Input,SimpleChanges } from '@angular/core';

@Component({
    selector: 'nwn-week-item',
    templateUrl: './week-item.component.html',
    styleUrls: ['./week-item.component.css'],
})
export class WeekItemComponent {
    @Input()
    type: string | 'defaultWeek' | 'compulsoryWeek' | 'disabledWeek' = 'defaultWeek';
    @Input()
    weekly_map : any[] = []
    @Input()
    weekly_product :any

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes , "changes in compusory weeks")
               for (let property in changes) {
                   if (property === 'weekly_map') {
                       // console.log(changes[property].currentValue , "current value")
                       this.weekly_map = changes[property].currentValue
                       if(this.weekly_map.find(d=>d.week == this.weekly_product.week)){
                           this.type = 'defaultWeek'
                       }
                        
                      
                   } 
                  
               }
           }
}
