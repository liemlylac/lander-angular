import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserHttp } from '../api/user.http';
import { User, UserModel } from '../models/user';
import { UserAddress } from '../models/user-address';
import { UserSetting } from '../models/user-setting';

@Injectable({
  providedIn: 'root'
})
export class UserService extends UserModel {

  constructor(
    private readonly userApi: UserHttp
  ) {
    super();
  }

  get(id: string): Observable<User> {
    return this.userApi.get(id);
  }

  create(user: User): Observable<User> {
    return undefined;

  }

  update(user: User): Observable<User> {
    return undefined;

  }

  getUserAddresses(id: string): Observable<UserAddress> {
    return undefined;

  }

  getUserSettings(id: string): Observable<UserSetting> {
    return undefined;

  }

  getLoggedUser(): Observable<User> {
    return this.userApi.getLoggedUser();
  }

  updateLoggedUser(user: User): Observable<User> {
    return undefined;
  }

}
