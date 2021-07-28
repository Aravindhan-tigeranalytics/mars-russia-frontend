export interface PromoCompareModel {
    week:number;
    date:any;
    discount:[
      {
          tpr:number,
          co_inv:number
      }  
    ]
  }