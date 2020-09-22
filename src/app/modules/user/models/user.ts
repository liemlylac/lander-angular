import { Observable } from 'rxjs';
import { UserAddress } from './user-address';
import { UserSetting } from './user-setting';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  address?: UserAddress[];
  settings?: UserSetting;
}

export abstract class UserModel {
  abstract get(id: string): Observable<User>;

  abstract create(user: User): Observable<User>;

  abstract update(user: User): Observable<User>;

  abstract getUserSettings(id: string): Observable<UserSetting>;

  abstract getUserAddresses(id: string): Observable<UserAddress>;

  abstract getLoggedUser(): Observable<User>;

  abstract updateLoggedUser(user: User): Observable<User>;
}


