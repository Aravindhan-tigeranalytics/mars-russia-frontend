import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';;
import {ApiService} from './api.service'
import {Product , ProductWeek , ListPromotion , LoadedScenarioModel} from "../models"
@Injectable({
  providedIn: 'root'
})
export class OptimizerService {
  private loadedScenarioObservable = new BehaviorSubject<LoadedScenarioModel>(null as any)
  private simulatedDataObservable = new BehaviorSubject<any>(null)
  private compareScenarioIdObservable = new BehaviorSubject<Array<number>>([])
  private productWeekObservable = new BehaviorSubject<Array<ProductWeek>>([])
  base_line_promotion = []
  private promotionObservable = new BehaviorSubject<string[]>([]);

  constructor(
    private apiService: ApiService
  ) { }
  public setCompareScenarioIdObservable(id:Array<number>){
    this.compareScenarioIdObservable.next(id)

  }
  public setSimulatedDataObservable(data:any){
    this.simulatedDataObservable.next(data)

  }
  public getSimulatedDataObservable():Observable<any>{
    return this.simulatedDataObservable.asObservable()
  }
  public getProductWeekObservable():Observable<ProductWeek[]>{
    return this.productWeekObservable.asObservable()
  }
  public setProductWeekObservable(val:any[]){
     this.productWeekObservable.next(val)
  }
  public getCompareScenarioIdObservable(){
    return this.compareScenarioIdObservable.asObservable()

  }
  public setLoadedScenarioModel(loaded:LoadedScenarioModel){
    this.loadedScenarioObservable.next(loaded)

  }
  public getLoadedScenarioModel():Observable<LoadedScenarioModel>{
    return this.loadedScenarioObservable.asObservable()
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
   
    this.apiService.get<ProductWeek[]>('api/scenario/promo-simulate-test/'+id).subscribe(
      data=>this.productWeekObservable.next(data)
      )

  }
  getPromoSimulateData(requestData: any): Observable<any> {
    return this.apiService.post<any>('api/scenario/promo-simulate/', requestData)
    
  }  
  savePromoScenario(requestData: any):Observable<any>{
    return this.apiService.post<any>('api/scenario/save/' , requestData)

  }
  downloadPromo(requestData: any):Observable<any>{
    // promo-download/
    return this.apiService.postd('api/scenario/promo-download/' , requestData 
      )
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
