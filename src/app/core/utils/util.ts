export function decodePromotion(promo_name:string){
  let obj ={
    "promo_mechanics" : "",
    "promo_depth" : 0,
    "co_investment":0

  }
  if(promo_name.includes("N+1")){
    obj["promo_mechanics"] = "N+1"
    let arr:Array<any>|null = promo_name.match(/\d+/g) 
    if(arr?.length ==3){
      obj["promo_depth"] = parseInt(arr[1])
      obj["co_investment"] = parseInt(arr[2])
    }
    if(arr?.length ==2){
      obj["promo_depth"] = parseInt(arr[1])
      obj["co_investment"] = 0
    }
  }
  else if(promo_name.includes("Motivation")){
    let arr:Array<any>|null = promo_name.match(/\d+/g) 
    obj["promo_mechanics"] = "Motivation"
    if(arr?.length ==2){
      obj["promo_depth"] = parseInt(arr[0])
      obj["co_investment"] = parseInt(arr[1])
    }
    if(arr?.length ==1){
      obj["promo_depth"] = parseInt(arr[0])
      obj["co_investment"] = 0
    }
  }
  else if(promo_name.includes("Traffic")){
    let arr:Array<any>|null = promo_name.match(/\d+/g)
    obj["promo_mechanics"] = "Traffic"
    if(arr?.length ==2){
      obj["promo_depth"] = parseInt(arr[0])
      obj["co_investment"] = parseInt(arr[1])
    }
    if(arr?.length ==1){
      obj["promo_depth"] = parseInt(arr[0])
      obj["co_investment"] = 0
    }
  }
  else if(promo_name.includes("TPR")){
    let arr:Array<any>|null = promo_name.match(/\d+/g)
    if(arr?.length ==2){
      obj["promo_depth"] = parseInt(arr[0])
      obj["co_investment"] = parseInt(arr[1])
    }
    if(arr?.length ==1){
      obj["promo_depth"] = parseInt(arr[0])
      obj["co_investment"] = 0
    }
  }
  return obj
  // "N+1-25% (Co-8%)"
}


export function genratePromotion(motivation , n_plus_1, traffic , promo_depth , co_inv ){
  let promo_name = "TPR"
  let promo_string = ""
  // debugger
  // console.log(motivation , n_plus_1, traffic , promo_depth , co_inv , "generate promotion details")
  if(motivation){
    promo_name = "Motivation"

  }
  else if(n_plus_1){
    promo_name = "N+1"
  }
  else if(traffic){
    promo_name = "Traffic"
  }
  if(promo_depth){
promo_string+=promo_name + "-" + promo_depth + "%"
  }
  if(co_inv){
    promo_string+= " (Co-"+co_inv+"%)"
  }
  // console.log(promo_string , "generate promotion details promo-string")
  return promo_string
}


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
  
  