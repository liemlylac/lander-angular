import { Component, OnDestroy } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { TokenService } from '../@auth/services/token.service';
import { PagesMenuService } from './pages-menu.service';

@Component({
  selector: 'app-modules',
  template: `
    <app-main-layout>
      <nb-menu [items]="menu"> </nb-menu>
      <router-outlet></router-outlet>
    </app-main-layout>
  `
})
export class PagesComponent implements OnDestroy {
  menu: NbMenuItem[];
  active = true;

  constructor(
    private readonly modulesMenu: PagesMenuService,
    private readonly tokenService: TokenService
  ) {
    this.initMenu();
    this.tokenService.tokenChange().pipe(
      takeWhile(() => this.active)
    ).subscribe(() => {
      this.initMenu();
    });
  }

  initMenu(): void {
    this.modulesMenu.getMenu().pipe(
      takeWhile(() => this.active)
    ).subscribe(menu => {
      this.menu = menu;
    });
  }

  ngOnDestroy(): void {
    this.active = false;
  }
}
