import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'imagePipe' })
export class ImagePipe implements PipeTransform {
   
  transform(product:any): any {
      let ret = "/assets/subbrand-img/orbit-otc.png"
      console.log(product , "product in image pipe")
     
    switch (product) {
        case "Big Bars":
          // ret =  "/assets/subbrand-img/bigbars.jpg"
          ret =  "/assets/subbrand-img/bars.jpg"
          break
        case "Orbit OTC":
          ret =  "/assets/subbrand-img/orbit-otc.png"
          break
        case "A.Korkunov 192g" || "A.Korkunov 256g" || "A.Korkunov 110g":
          ret =  "/assets/subbrand-img/A-Korkunov.jpg"
          break
        case "Skittles 38g":
          ret =  "/assets/subbrand-img/skittles.jpg"
          break
        case "Orbit XXL":
          ret =  "/assets/subbrand-img/orbit-xxl.jpg"
          break
        case "M&M 360g":
          ret =  "/assets/subbrand-img/m&m360.jpg"
          break
        case "M&M 45g":
          ret =  "/assets/subbrand-img/m&m45.jpg"
          break
        case "Snickers Crisp Trio":
          ret =  "/assets/subbrand-img/Crisp-Trio.jpg"
          break
        default:
            break 
      }
      return ret
  } 
}