import { Component,EventEmitter,Input, OnInit,Output,SimpleChanges } from '@angular/core';
import { ProductWeek } from '@core/models';

@Component({
    selector: 'nwn-weeks-ignored',
    templateUrl: './weeks-ignored.component.html',
    styleUrls: ['./weeks-ignored.component.css'],
})
export class WeeksIgnoredComponent {

    @Input()
    quarter_year = []
    @Input()
    product_week:ProductWeek[] = []
    @Output()
    ignoredWeekEvent = new EventEmitter()
    selected_product_week:ProductWeek[] = []
    selected_quarter:string = ''
    weekly_map:Array<any> = [] //{"selected_promotion" : $event.value , "week" : this.product_week 
    ngOnInit(){
        
       
    }
    apply(){
        this.ignoredWeekEvent.emit({
            "id" : "weeks-ignored",
            "value" : this.weekly_map
        })

    }
    getWeek(p,weekly_m){
        if(weekly_m.find(d=>d.week == p.week)){
            return 'disabledWeek'
        }
        return "defaultWeek"
    }
    clickWeekly(product){
        if(this.weekly_map.find(d=>d.week == product.week)){
            this.weekly_map = this.weekly_map.filter(d=>d.week!=product.week)
        }
        else{
            this.weekly_map.push(product)

        }
        
    }
    filter_product_week(){
        this.selected_product_week  = this.product_week.filter(data=>data.quater == parseInt(
            this.selected_quarter.split("Q")[1]
            )
            ).sort((a,b)=>(a.week > b.week) ? 1 : ((b.week > a.week) ? -1 : 0))

            console.log(this.selected_product_week , "selected product week")

    }
    changeQuarter(key:string){
        
        // debugger
        this.selected_quarter = key
        this.selected_product_week  = this.product_week.filter(data=>data.quater == parseInt(
            this.selected_quarter.split("Q")[1]
            )
            ).sort((a,b)=>(a.week > b.week) ? 1 : ((b.week > a.week) ? -1 : 0))
    }
    ngOnChanges(changes: SimpleChanges) {
 console.log(changes , "changes in compusory weeks")
        for (let property in changes) {
            if (property === 'quarter_year') {
                // console.log(changes[property].currentValue , "current value")
                this.quarter_year = changes[property].currentValue
                this.selected_quarter=this.quarter_year[0]
               
            } 
            if (property === 'product_week') {
                // console.log(changes[property].currentValue , "current value")
                this.product_week = changes[property].currentValue
                this.filter_product_week()
               
            } 
        }
    }

}
