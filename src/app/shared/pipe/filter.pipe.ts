import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
   
  transform(items: any[], searchText: string): any[] {
      console.log(items ,"items in pipe ")
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    // debugger
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.value.toLocaleLowerCase().includes(searchText);
    });
  }
}