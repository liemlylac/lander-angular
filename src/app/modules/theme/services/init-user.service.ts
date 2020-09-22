import { Injectable } from '@angular/core';
import { NbJSThemesRegistry, NbThemeService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../user/models/user';
import { UserService } from '../../user/services/user.service';
import { UserStore } from '../../user/stores/user.store';

@Injectable({
  providedIn: 'root'
})
export class InitUserService {

  constructor(
    private readonly userService: UserService,
    private readonly userStore: UserStore,
    private readonly jsThemes: NbJSThemesRegistry,
    private readonly themeService: NbThemeService,
  ) {
  }

  initLoggedUser(): Observable<User> {
    return this.userService.getLoggedUser()
      .pipe(tap((user: User) => {
        if (user) {
          this.userStore.setUser(user);
          if (user.settings && user.settings.theme) {
            if (this.jsThemes.has(user.settings.theme)
              && !!this.jsThemes.get(user.settings.theme).variables.initialized) {
              this.themeService.changeTheme(user.settings.theme);
            }
          }
        }
      }));

  }
}
