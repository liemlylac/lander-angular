import { Injectable } from '@angular/core';
import { NbJSThemesRegistry, NbThemeService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '@core/interfaces/user';
import { UserService } from '@core/services/user.service';
import { UserStore } from '../../pages/user/stores/user.store';

@Injectable({ providedIn: 'root' })
export class InitUserService {

  constructor(
    private readonly userService: UserService,
    private readonly userStore: UserStore,
    private readonly jsThemes: NbJSThemesRegistry,
    private readonly themeService: NbThemeService,
  ) {
  }

  initCurrentUser(): Observable<User> {
    return this.userService.getCurrentUser()
      .pipe(tap((user: User) => {
        if (!user) {
          return;
        }
        this.userStore.setUser(user);
        if (user.settings && user.settings.theme) {
          if (this.jsThemes.has(user.settings.theme)
            && !!this.jsThemes.get(user.settings.theme).variables.initialized) {
            this.themeService.changeTheme(user.settings.theme);
          }
        }
      }));

  }
}
