import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { HttpService } from '../services/http.service';

@Injectable()
export class UserApi {
  private readonly controllerName = 'user';

  constructor(private readonly httpService: HttpService) {
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<any[]> {
    const params = new HttpParams()
      .set('pageNumber', `${pageNumber}`)
      .set('pageSize', `${pageSize}`);

    return this.httpService.get(this.controllerName, { params })
      .pipe(map(data => data.map(item => {
        return this.getUserAvatarUrl(item);
      })));
  }

  getCurrentUser(): Observable<any> {
    return this.httpService.get(`${this.controllerName}/profile`)
      .pipe(map(data => {
        return this.getUserAvatarUrl(data);
      }));
  }

  get(id: number): Observable<any> {
    return this.httpService.get(`${this.controllerName}/${id}`)
      .pipe(map(data => {
        return this.getUserAvatarUrl(data);
      }));
  }

  getUserAvatarUrl(user: User): User {
    const avatar = `${this.httpService.apiUrl}/${this.controllerName}/avatar/${user.avatar}`;
    return { ...user, avatar };
  }

  add(item: any): Observable<any> {
    return this.httpService.post(this.controllerName, item);
  }

  updateCurrentUser(user: any): Observable<any> {
    return this.httpService.put(`${this.controllerName}/current`, user);
  }

  update(user: any): Observable<any> {
    return this.httpService.put(`${this.controllerName}/${user.id}`, user);
  }

  delete(id: number): Observable<boolean> {
    return this.httpService.delete(`${this.controllerName}/${id}`);
  }
}
