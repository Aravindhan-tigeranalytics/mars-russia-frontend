import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'subFilter' })
export class SubTabFilter implements PipeTransform {
   
  transform(items: any[], product: string,args?:any) {
    // // console.log(args , "args any extra")
    //   // console.log(items ,"items in pipe ")
    // // if (!items) {
    // //   return [];
    // // }
    // console.log(items, "subFilter items ")
    // console.log(product , "subFilter product")
    console.log(items , "iems in pipe")
    console.log(product , "product in pipe")

    return items.filter(d=>d.account_name == product).map(d=>d.product_group)
    
  }
} 