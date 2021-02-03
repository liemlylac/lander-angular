import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  get apiUrl(): string {
    return environment.apiHttpUrl;
  }

  request(method, url, data?, options?): Observable<any> {
    return this.http.request(method, `${this.apiUrl}/${url}`, { body: data, ...options});
  }

  get(path: string, options?): Observable<any> {
    return this.http.get(`${this.apiUrl}/${path}`, options);
  }

  post(path: string, data, options?): Observable<any> {
    return this.http.post(`${this.apiUrl}/${path}`, data, options);
  }

  put(path: string, data, options?): Observable<any> {
    return this.http.put(`${this.apiUrl}/${path}`, data, options);
  }

  delete(path: string, options?): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${path}`, options);
  }
}
