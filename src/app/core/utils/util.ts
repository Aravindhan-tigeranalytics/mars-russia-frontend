export function generateMessage1(metric , type){
  // debugger
  // arrow: "carret-up"
  let message = ``
  if(metric['arrow'] == "carret-up"){
    message += `in increase in ${type} by ${metric['converted_difference']} ${metric['percent']}`

  }
  else if(metric['arrow'] == "carret-down"){
    message += `in decrease in ${type} by ${metric['converted_difference']} ${metric['percent']}`

  }
  else {
    message += `in unchanged ${type}`

  }

return message
}
export function generateMessage2(metric){
  let message = `Retailer profit `
  if(metric['arrow'] == "carret-up"){
    message +=  `has increased by ${metric['converted_difference']} ${metric['percent']} as compared to the base calendar`

  }
  else if(metric['arrow'] == "carret-down"){
    message +=  `has decreased by ${metric['converted_difference']} ${metric['percent']} as compared to the base calendar`

  }
  else {
    message +=  `is unchanged`

  }
  return message
}

export function generateMessage3(metric){
  let message = ` Trade expense `
  if(metric['arrow'] == "carret-up"){
    message+= `has increased by ${metric['converted_difference']} ${metric['percent']}`

  }
  else if(metric['arrow'] == "carret-down"){
    message+= `has reduced by ${metric['converted_difference']} ${metric['percent']}`
  }
  else{
    message+= `is unchanged`
  }
  
  return message
}

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
    obj["promo_mechanics"] = "TPR"
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
    a  = parseFloat(a.toFixed(4));
    b  = parseFloat(b.toFixed(4));
    
    if (a == 0 && b == 0){
        return (0).toFixed(2)
    }
    if (a > 0 && b == 0){
        return (100).toFixed(2)
    }
    // return  (100 * Math.abs( ( a - b ) / ( (a+b)/2 ) )).toFixed(2);
    return  (100 * ( ( a - b ) / ( (a+b)/2 ) )).toFixed(2);
}

export function formatNumber(number: any,currency: boolean,percentage: boolean,debug=false ){
  // if(debug){
  //   debugger
  // }
  number  = parseFloat(number.toFixed(4));
  
    var SI_SYMBOL = ["", "K", "M", "B", "T", "P", "E"];
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


export function generate_consecutive_list_max_diff(arr:Array<number>){
  // debugger
  if(arr.length > 0){
    let final:any[] = []
    let temp:number[] = [arr[0]]
    let max_diff = 52
    for(let i =1;i <= arr.length;i++ ){
      if(arr[i] - arr[i-1]!=1){
        let diff = arr[i] - temp[temp.length -1]
        if(diff < max_diff){
          max_diff = diff
        }
        final.push(temp)
        temp = []
        if(arr[i]){
          temp.push(arr[i])

        }
        
      }
      else{
        temp.push(arr[i])
      }
    }
    if(temp.length > 0){
      final.push(temp)

    }
    
    // console.log(final , "final brfore return")

    return {
      "min_diff" : max_diff,
      "consecutive" : final,
      "max_len_consecutive" : Math.max(...final.map(d=>d.length)),
     
    }

  }
  
return {
  "min_diff" : 0,
  "max_len_consecutive" : 52,
  "consecutive" : []
}
}

export function check_validate_gap(min_gap , calculated_gap){
  return calculated_gap > min_gap || calculated_gap == 0 || calculated_gap == 1

}

export function calculate_not_allowed_array(comp_week , max_con){
  // console.log(comp_week , "calculate not allowed comp")
  let not_allowed:any[]= []
  // debugger
  for(let i =0;i < comp_week.length;i++ ){
    let min_extreme = comp_week[i][0]  - max_con
    let max_extreme = comp_week[i][comp_week[i].length - 1]  + max_con
    for(let j = min_extreme ; j <=max_extreme ; j++){
      // console.log(j)
      not_allowed.push(j)
      // not_allowed.push(j)

    }
  }
  return not_allowed
  

}
  
  
// def check_valide_gap(min_gap , calculated_gap):
// return calculated_gap >= min_gap or calculated_gap ==1 or calculated_gap ==0