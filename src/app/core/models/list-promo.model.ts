export interface PricingPromoModel{
    lpi : number,
    rsp : number,
    cogs : number ,
    elasticity : number,

}

export interface MetaInfo {
    id?: number,
    retailer : string,
    product_group : string,
    
    pricing : boolean | PricingPromoModel,
    cogs_date? : Date
    list_price_date? : Date,  
    rsp_date? : Date
}


export interface ListPromotion {
    id: number,
    name: string,
    comments: string,
    scenario_type: string,
    meta: boolean | MetaInfo | Array<MetaInfo>,
    
    
    }


// "id": 37,
//         "name": "optimizer-promo-map-test",
//         "comments": "optimizer-promo-map-test",
//         "scenario_type": "optimizer",
//         "has_price": false