import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserStore {
  private user: User = null;

  protected userState$ = new BehaviorSubject<User>(this.user);

  setUser(user: User): void {
    this.user = user;
    this.changeUserState(user);
  }

  getUser(): User {
    return this.user;
  }

  changeUserState(user: User): void {
    this.userState$.next(user);
  }
}
