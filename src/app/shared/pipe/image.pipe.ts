import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'imagePipe' })
export class ImagePipe implements PipeTransform {
   
  transform(product:any): any {
      let ret = "/assets/subbrand-img/orbit-otc.png"
    console.log(product , "product in image pipe")
    // debugger;
     
    switch (product) {
        
        case "Big Bars":
          ret =  "/assets/subbrand-img/bigbars.jpg"
          break
        case "Orbit OTC":
          ret =  "/assets/subbrand-img/orbit-otc.png"
          break
        case "A.Korkunov 192g":
            ret =  "/assets/subbrand-img/A-Korkunov.jpg"
            break
        default:
            break 
      }
      return ret
} 
}