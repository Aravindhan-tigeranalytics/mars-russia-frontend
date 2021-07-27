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

  export function  percentageDifference(a: number, b: number){
    if (a == 0 && b == 0){
        return (0).toFixed(2)
    }
    if (a > 0 && b == 0){
        return (100).toFixed(2)
    }
    return  (100 * Math.abs( ( a - b ) / ( (a+b)/2 ) )).toFixed(2);
}

export function formatNumber(number: any,currency: boolean,percentage: boolean){
    var SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];
    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier == 0) return number.toFixed(2);

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    if(currency && percentage){
        return scaled.toFixed(1) + '%';
    }

    if(currency && !percentage){
        return scaled.toFixed(1) + suffix + ' ₽';
    }
    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}
  
  