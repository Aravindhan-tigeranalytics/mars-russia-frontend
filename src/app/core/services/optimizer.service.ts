import { Injectable } from '@angular/core';
import {ApiService} from './api.service'
import {Product , ProductWeek} from "../models"
@Injectable({
  providedIn: 'root'
})
export class OptimizerService {

  constructor(
    private apiService: ApiService
  ) { }

  fetchVal(){  
    return this.apiService.get<Product[]>('api/scenario/promo-simulate-test/')
  }
  fetch_week_value(id:number){
   
    return this.apiService.get<ProductWeek[]>('api/scenario/promo-simulate-test/'+id)

  }


}
