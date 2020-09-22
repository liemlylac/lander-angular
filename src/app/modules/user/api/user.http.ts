import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../core/services/http.service';
import { User } from '../models/user';
import { UserApi } from './user.api';

@Injectable({
  providedIn: 'root'
})
export class UserHttp extends UserApi {
  private readonly controllerName = 'user';

  constructor(
    private readonly http: HttpService
  ) {
    super();
  }

  getLoggedUser(): Observable<User> {
    return this.http.get(`${this.controllerName}/profile`)
      .pipe(map((user: User) => {
        return this.getUserAvatarUrl(user);
      }));
  }

  get(id: string): Observable<User> {
    return this.http.get(`${this.controllerName}/${id}`)
      .pipe(map((user: User) => {
        return this.getUserAvatarUrl(user);
      }));
  }

  getUserAvatarUrl(user: User): User {
    const avatar = `${this.http.apiHttpUrl}/${this.controllerName}/avatar/${user.avatar}`;
    return { ...user, avatar };
  }
}
