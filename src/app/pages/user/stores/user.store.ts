import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { User } from '@core/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserStore {
  private user: User;

  // @ts-ignore
  protected userEvent$ = new BehaviorSubject(this.user);

  getUser(): User {
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
    this.fireSetUserEvent(user);
  }

  fireSetUserEvent(user: User): void {
    this.userEvent$.next(user);
  }

  onChangeUserEvent(): Observable<User> {
    return this.userEvent$.pipe(share());
  }

  setUserSetting(settingKey: string, value: string): void {
    if (this.user) {
      if (this.user.settings) {
        this.user.settings[settingKey] = value;
      } else {
        const setting: any = {};
        setting[settingKey] = value;
        this.user.settings = setting;
      }

      this.fireSetUserEvent(this.user);
    }
  }
}
