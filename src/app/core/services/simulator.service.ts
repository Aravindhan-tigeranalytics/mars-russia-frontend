import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Employee } from '../shared/employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SimulatorService {
  
  // Define API
  apiURL = 'http://localhost:8000/api/';
  token = '810cb754eaef90fe8c49dee9510be98234c5401f'
  requestData = { "csrfmiddlewaretoken":"HhJ2eb2y3KSj4YVZAsmWLOTXBV0V8FUmFxihuOWqSLGNVEejCT9NtwOB5mUqfK8m", "promo_elasticity":"0", "param_depth_all":"0", "account_name":"Tander", "corporate_segment":"LOOSE", "strategic_cell":"Reignite Core Gum", "brand":"M&M's", "brand_format":"M&M's@M&M's", "product_group":"Loose", "week-1":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-2":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-3":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-4":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-5":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-6":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-7":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-8":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-9":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-10":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-11":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-12":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-13":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-14":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-15":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-16":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-17":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-18":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-19":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-20":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-21":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-22":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-23":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-24":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-25":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-26":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-27":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-28":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-29":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-30":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-31":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-32":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-33":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-34":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-35":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-36":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-37":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-38":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-39":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-40":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-41":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-42":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-43":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-44":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-45":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-46":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-47":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-48":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-49":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-50":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-51":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 }, "week-52":{ "promo_depth":0.0, "promo_mechanics":"None", "co_investment":0 } }
  constructor(private http: HttpClient) { }

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

  // // HttpClient API get() method => Fetch employees list
  // getEmployees(): Observable<any> {
  //   return this.http.get<any>(this.apiURL + '/employees')
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  // // HttpClient API get() method => Fetch employee
  // getEmployee(id: any): Observable<any> {
  //   return this.http.get<any>(this.apiURL + '/employees/' + id)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }  

  // HttpClient API post() method => Create employee
  getPromoSimulateData(requestData: any): Observable<any> {
    return this.http.post<any>(this.apiURL + 'scenario/promo-simulate/', JSON.stringify(requestData), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // // HttpClient API put() method => Update employee
  // updateEmployee(id: any, employee: any): Observable<any> {
  //   return this.http.put<any>(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  // // HttpClient API delete() method => Delete employee
  // deleteEmployee(id: any){
  //   return this.http.delete<any>(this.apiURL + '/employees/' + id, this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

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
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}