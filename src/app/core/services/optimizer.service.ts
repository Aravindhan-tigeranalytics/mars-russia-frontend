import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';;
import {ApiService} from './api.service'
import {Product , ProductWeek , ListPromotion , LoadedScenarioModel} from "../models"
@Injectable({
  providedIn: 'root'
})
export class OptimizerService {
  private compareScenarioIdObservable = new BehaviorSubject<Array<number>>([])
  base_line_promotion = []
  private promotionObservable = new BehaviorSubject<string[]>([]);

  constructor(
    private apiService: ApiService
  ) { }
  public setCompareScenarioIdObservable(id:Array<number>){
    this.compareScenarioIdObservable.next(id)

  }
  public getCompareScenarioIdObservable(){
    return this.compareScenarioIdObservable.asObservable()

  }
  

  public getPromotionObservable(): Observable<string[]> {
    return this.promotionObservable.asObservable();
  }
  public setPromotionObservable(val:string[]) {
    this.promotionObservable.next(val);
  }

  fetchVal(){  
    return this.apiService.get<Product[]>('api/scenario/promo-simulate-test/')
  }
  fetch_week_value(id:number){
   
    return this.apiService.get<ProductWeek[]>('api/scenario/promo-simulate-test/'+id)

  }
  fetch_load_scenario(){
    return this.apiService.get<ListPromotion[]>('api/scenario/list-saved-promo/')
      // http://localhost:8000/api/scenario/list-saved-promo/39/
  }
  fetch_load_scenario_by_id(id:number){
    return this.apiService.get<LoadedScenarioModel>('api/scenario/list-saved-promo/' + id)
      // http://localhost:8000/api/scenario/list-saved-promo/39/
  }
  set_base_line_promotion(promotions:any){
    this.base_line_promotion = promotions
    console.log(this.base_line_promotion , "Base line promotion set")

  }
  get_base_line_promotions(){
    return this.base_line_promotion
  }


}
