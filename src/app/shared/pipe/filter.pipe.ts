import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
   
  transform(items: any[], searchText: string,args?:any): any[] {
    // console.log(args , "args any extra")
      // console.log(items ,"items in pipe ")
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    // debugger
    searchText = searchText.toLocaleLowerCase();
    if(args && args == 'promo'){
      return items.filter(it => {
        return it.name.toLocaleLowerCase().includes(searchText);
      });

    }

    return items.filter(it => {
      return it.value.toLocaleLowerCase().includes(searchText);
    });
  }
} 