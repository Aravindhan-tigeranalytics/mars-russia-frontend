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
    weekly_map_ignored : any[] = []
    @Input()
    weekly_map:any[] = []
    @Input()
    weekly_product :any
    @Input()
    cumpulsory_week_val:any[]
    @Input()
    ignored_week_val:any[]

    ngOnChanges(changes: SimpleChanges) {
        // console.log(changes , "changes in compusory weeks")
               for (let property in changes) {
                   
                   if (property == 'weekly_map_ignored') {
                       this.weekly_map_ignored = changes[property].currentValue
                       
                       if(this.weekly_map_ignored.find(d=>d.week == this.weekly_product.week)){
                           this.type = 'disabledWeek'
                       }
                       else{
                           if(!this.cumpulsory_week_val.find(d=>d.week == this.weekly_product.week)){
                            this.type = "defaultWeek"
                           }
                          
                       }
                        
                      
                   } 
                   if (property == 'weekly_map') {
                    this.weekly_map = changes[property].currentValue
                    
                    if(this.weekly_map.find(d=>d.week == this.weekly_product.week)){
                        this.type = 'compulsoryWeek'
                    }
                    else{
                        if(!this.ignored_week_val.find(d=>d.week == this.weekly_product.week)){
                            this.type = "defaultWeek"
                           }
                          
                        // this.type = "defaultWeek"
                    }
                     
                   
                } 
                   if (property == 'cumpulsory_week_val') {
                    this.cumpulsory_week_val = changes[property].currentValue
                    
                    if(this.cumpulsory_week_val.find(d=>d.week == this.weekly_product.week)){
                        this.type = 'compulsoryWeek'
                    }  
                   
                } 
                if (property == 'ignored_week_val') {
                    this.ignored_week_val = changes[property].currentValue
                    
                    if(this.ignored_week_val.find(d=>d.week == this.weekly_product.week)){
                        this.type = 'disabledWeek'
                    }  
                   
                } 
                  
               }
           }
}
