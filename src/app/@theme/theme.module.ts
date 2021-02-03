import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  CORPORATE_THEME,
  COSMIC_THEME,
  DARK_THEME,
  DEFAULT_THEME,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbThemeModule,
  NbUserModule
} from '@nebular/theme';
import { AuthModule } from '@auth/auth.module';
import { MainLayoutComponent } from './layouts';
import { InitUserService } from './services/init-user.service';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';

const NB_MODULES = [
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbThemeModule,
  NbUserModule,
  NbEvaIconsModule,
];

const COMPONENTS = [
  MainHeaderComponent,
  MainFooterComponent,
  MainLayoutComponent
];

const PIPES = [];

@NgModule({
  imports: [CommonModule, AuthModule, ...NB_MODULES],
  declarations: [...COMPONENTS, ...PIPES, AuthHeaderComponent, AuthFooterComponent],
  exports: [CommonModule, ...COMPONENTS, ...PIPES]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot({ name: 'default' }, [
          DEFAULT_THEME,
          COSMIC_THEME,
          CORPORATE_THEME,
          DARK_THEME
        ]).providers,
        InitUserService
      ]
    };
  }
}
