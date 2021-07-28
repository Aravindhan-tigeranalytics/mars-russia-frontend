import { Component, OnInit, AfterViewInit, ViewChild, ElementRef,Input } from '@angular/core';
import { LoadedScenarioModel , PromoCompareModel} from 'src/app/core/models';
@Component({
    selector: 'nwn-promotion-plans-tab',
    templateUrl: './promotion-plans-tab.component.html',
    styleUrls: ['./promotion-plans-tab.component.css'],
})
export class PromotionPlansTabComponent implements OnInit, AfterViewInit {
    scenario_names:Array<string> = []
    translate_y: string = '';
    currentTranslateRate: string = '';
    @Input()
    loaded_scenario:Array<LoadedScenarioModel> = []
    promotions :PromoCompareModel[] = []
    constructor(private elRef: ElementRef) {}

    public ppTableWidth: any;
    public ppTableHeight: any;

    ngOnInit(): void {
        this.ppTableWidth = window.innerWidth - 155;
        this.ppTableHeight = window.innerHeight - 250;
        this.generate_metrics(this.loaded_scenario)
    }
    generate_metrics(loaded_scenario : Array<LoadedScenarioModel>){
        
       
        loaded_scenario.forEach(element => {
            
           
            this.scenario_names.push(element.scenario_name)
            element.simulated.weekly.forEach(data=>{
                let promo = this.promotions.find(d=>d.week == data.week)
                if(promo){
                    promo.discount.push( {"tpr":data.promo_depth , "co_inv" : data.promo_depth})

                }
                else{
                    this.promotions.push(
                        {"week" : data.week,
                        "date":data.date , 
                        discount:[
                            {"tpr":data.promo_depth , "co_inv" : data.promo_depth}
                        ]})
                     

                }
               
                
            })
      
        });
        console.log(this.promotions , "promotions data in promo plans")
       
       

    }


    @ViewChild('promoplanTableScroll', { static: false }) promoplanTableScroll: any;
    scrolling_table: any;

    ngAfterViewInit() {
        // this.slider = this.elRef.nativeElement.querySelector('.slide');
        this.scrolling_table = this.elRef.nativeElement.querySelector('.promoplanTableScroll');
        this.scrolling_table.addEventListener('scroll', this.freeze_pane_listener(this.scrolling_table));
    }

    freeze_pane_listener(what_is_this: { scrollTop: string; scrollLeft: string }) {
        return () => {
            var i;
            var self = this;
            self.translate_y = '';

            var translate_y = 'translate(0px,' + what_is_this.scrollTop + 'px)';
            var translate_x = 'translate(' + what_is_this.scrollLeft + 'px)';
            var translate_xy = 'translate(' + what_is_this.scrollLeft + 'px,' + what_is_this.scrollTop + 'px)';

            self.currentTranslateRate = what_is_this.scrollLeft;

            var fixed_vertical_elts = document.getElementsByClassName(
                'ppfreeze_vertical',
            ) as HTMLCollectionOf<HTMLElement>;
            var fixed_horizontal_elts = document.getElementsByClassName(
                'ppfreeze_horizontal',
            ) as HTMLCollectionOf<HTMLElement>;
            var fixed_both_elts = document.getElementsByClassName('ppfreeze') as HTMLCollectionOf<HTMLElement>;

            for (i = 0; i < fixed_horizontal_elts.length; i++) {
                // fixed_horizontal_elts[i].style.webkitTransform = translate_x;
                fixed_horizontal_elts[i].style.transform = translate_x;
            }
            for (i = 0; i < fixed_vertical_elts.length; i++) {
                // fixed_vertical_elts[i].style.webkitTransform = translate_y;
                fixed_vertical_elts[i].style.transform = translate_y;
            }
            for (i = 0; i < fixed_both_elts.length; i++) {
                // fixed_both_elts[i].style.webkitTransform = translate_xy;
                fixed_both_elts[i].style.transform = translate_xy;
            }
        };
    }
    singleSelect: any = [];
    config = {
        displayKey: 'name', // if objects array passed which key to be displayed defaults to description
        search: false,
    };
    yearValue = [
        {
            _id: '1year',
            index: 0,
            name: '1 Year',
        },
        {
            _id: '2year',
            index: 0,
            name: '2 Year',
        },
        {
            _id: '3year',
            index: 0,
            name: '3 Year',
        },
    ];
}
