export interface PricingPromoModel{
    lpi : number,
    rsp : number,
    cogs : number ,
    elasticity : number
}

export interface MetaInfo {
    retailer : string,
    product_group : string,
    pricing : boolean | PricingPromoModel
}


export interface ListPromotion {
    id: number,
    name: string,
    comments: string,
    scenario_type: string,
    meta: boolean | MetaInfo,
    
    
    }


// "id": 37,
//         "name": "optimizer-promo-map-test",
//         "comments": "optimizer-promo-map-test",
//         "scenario_type": "optimizer",
//         "has_price": false