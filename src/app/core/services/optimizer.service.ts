import { Injectable } from '@angular/core';
import {ApiService} from './api.service'
@Injectable({
  providedIn: 'root'
})
export class OptimizerService {

  constructor(
    private apiService: ApiService
  ) { }

  fertchVal(){
    this.apiService.get('api/optimiser/calculate/').subscribe(data=>{
      console.log(data , "data")
    },error=>{
      console.log(error , "error")
    })
  }


}
