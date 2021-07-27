export function convertCurrency(value:any , per?:any , is_curr = true){
    if(value){
      let symbol = ""
      if(is_curr){
        symbol  = " ₽"

      }
      
      let str = value.toFixed(2).split(".")[0]
      let strlen = str.length
      let final = value
      let curr = ""
      if(strlen >=4 && strlen <=6){
        final = value / 1000;
        curr = "K"
  
      }
      else if (strlen >=7 && strlen <=9){
        final = value / 1000000
        curr = "M"
      }
      else if(strlen >= 10){
        final = value / 1000000000
        curr = "B"
      }
      // console.log(value , "ACTUAL")
      // console.log(strlen , "ACTUAL LEN")
      // console.log(final , "FINAL")
      if(per){
        symbol = " %"
      }
      return  final.toFixed(2) + curr + symbol
  
    }
    return 0
  }
  
  