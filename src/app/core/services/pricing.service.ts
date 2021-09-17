import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { ApiService } from './api.service'
import { retry, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PricingModel } from '@core/models';


@Injectable({
    providedIn: 'root'
})
export class PricingService{
    apiURL = environment.api_url;

    constructor(private http: HttpClient,private apiService: ApiService) { 


    }
    getPricingMetric(ids:any[]):Observable<PricingModel[]>{
       
       return this.apiService.get("api/scenario/scenario-metrics/" , ids )
    }

}