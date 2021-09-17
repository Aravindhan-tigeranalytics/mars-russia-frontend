export interface PricingModel {
    account_name:string;
    brand_filter:string;
    brand_format:string;
    corporate_segment:string;
    product_group : string;
    strategic_cell_filter : string;
    
base_price_elasticity: number
base_units: number

cross_elasticity: number
date: any
gmac: number
list_price: number
month: number
net_elasticity: number
off_inv: number
on_inv: number
period: any
product_weight_in_grams:number
quarter: number
retail_median_base_price_w_o_vat: number

tpr_discount: number
week: number
year: number
  }