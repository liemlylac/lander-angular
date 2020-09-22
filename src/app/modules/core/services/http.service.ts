import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  get apiHttpUrl(): string {
    return environment.apiHttpUrl;
  }

  get(path: string, options?): Observable<any> {
    return this.http.get(`${this.apiHttpUrl}/${path}`, options);
  }

  post(path: string, data, options?): Observable<any> {
    return this.http.post(`${this.apiHttpUrl}/${path}`, data, options);
  }

  put(path: string, data, options?): Observable<any> {
    return this.http.put(`${this.apiHttpUrl}/${path}`, data, options);
  }

  delete(path: string, options?): Observable<any> {
    return this.http.delete(`${this.apiHttpUrl}/${path}`, options);
  }
}
