import { Injectable } from '@angular/core';
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
// import {HttpClient} from '@angular/common/http';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_path = 'http://localhost:8000/'
  token = '810cb754eaef90fe8c49dee9510be98234c5401f'

  constructor(private http: HttpClient) {
    console.log('SERVICE CONSTRUCTOR');

   }
  private formatErrors(error: any) {
    return  throwError(error.error);
  }
   get<T>(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.token
   });
    return this.http.get<T>(`${this.api_path}${path}`,{ headers: reqHeader })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.api_path}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${this.api_path}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path:string): Observable<any> {
    return this.http.delete(
      `${this.api_path}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
