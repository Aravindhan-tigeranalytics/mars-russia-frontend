import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { ApiService } from './api.service'
import { retry, catchError , map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PricingModel,PriceSimulated } from '@core/models';
// import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class PricingService{
    apiURL = environment.api_url;
    private pricingSimulatedObservable = new BehaviorSubject<any>(null)

    constructor(private http: HttpClient,private apiService: ApiService) { 


    }
    getPricingMetric(ids:any[]):Observable<PricingModel[]>{
       
       return this.apiService.get("api/scenario/scenario-metrics/" , ids )
    }
    calculatePricingMetrics(formdata):Observable<PriceSimulated>{
        return this.apiService.post("api/scenario/scenario-metrics/" ,formdata).pipe(
            map((data : any)=>{
                return data['payload']
            })
        )
    }
    public getPricingSimulatedObservable():Observable<PriceSimulated>{
        return this.pricingSimulatedObservable.asObservable()

    }
    public setPricingSimulatedObservable(pricingSimulated : PriceSimulated){
        this.pricingSimulatedObservable.next(pricingSimulated)
    }

    savePricingScenario(requestData: any):Observable<any>{
        return this.apiService.post<any>('api/scenario/savescenario/' , requestData)
      }

}