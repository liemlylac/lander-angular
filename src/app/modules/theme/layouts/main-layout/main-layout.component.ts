import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  styleUrls: ['./main-layout.component.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <app-main-header></app-main-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
      <nb-layout-footer fixed>
        <app-main-footer></app-main-footer>
      </nb-layout-footer>
    </nb-layout>
  `
})
export class MainLayoutComponent {}
