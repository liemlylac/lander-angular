import { Injectable } from '@angular/core';
import { UserApi } from '@core/api/user.api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    private readonly userApi: UserApi
  ) {
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<User[]> {
    return this.userApi.list(pageNumber, pageSize);
  }

  getCurrentUser(): Observable<User> {
    return this.userApi.getCurrentUser()
      .pipe(
        map(user => {
          if (user && !user.setting) {
            user.setting = {};
          }
          return user;
        })
      );
  }

  get(id: number): Observable<User> {
    return this.userApi.get(id);
  }

  create(user: any): Observable<User> {
    return this.userApi.add(user);
  }

  update(user: any): Observable<User> {
    return this.userApi.update(user);
  }

  updateCurrent(user: any): Observable<User> {
    return this.userApi.updateCurrentUser(user);
  }

  delete(id: number): Observable<boolean> {
    return this.userApi.delete(id);
  }

}
