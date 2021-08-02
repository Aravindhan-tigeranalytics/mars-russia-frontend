import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'weekTypePipe' })
export class  WeekType implements PipeTransform {
   
  transform(val:any , weekly_map:any[]): string {
    console.log(val , "val in weektype pipe")
    console.log(weekly_map , "weekly map in weektype pipe")
    return "compulsoryWeek" 
      
  }
}

