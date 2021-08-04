import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service'
import { retry, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SimulatorService {
  
  // Define API
  apiURL = 'http://localhost:8000/api/';
  token = 'd3bdbb418856f47f56adeaec1dc86478abd29f96';

  public uploadedSimulatorDataObservable = new BehaviorSubject<any>('')

  constructor(private http: HttpClient,private apiService: ApiService) { }

  public setSimulatorDataObservable(value:any){
    this.uploadedSimulatorDataObservable.next(value)
    console.log("value setted",this.uploadedSimulatorDataObservable.asObservable())
  }
  
  public getSimulatorDataObservable(){
    console.log("getter called")
    return this.uploadedSimulatorDataObservable.asObservable()
  }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.token
    })
  }  

  getPromoSimulateData(requestData: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'scenario/promo-simulate/', JSON.stringify(requestData), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  uploadPromoSimulateInput(requestData: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + this.token
      })
    }  
    return this.http.post<any>(this.apiURL + 'scenario/promo-simulate-file-upload/', requestData, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  downloadWeeklyInputTemplate(): Observable<any> {
   let httpOptions:any = {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + this.token
      }),
      responseType: 'blob',
    } 
    return this.http.get<any>(this.apiURL + 'scenario/weekly-input-template-download/',httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error: any) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
   //   window.alert(errorMessage);
     return throwError(errorMessage);
  }

}