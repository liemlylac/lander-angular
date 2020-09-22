import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbAuthJWTInterceptor,
  NbAuthModule,
  NbTokenLocalStorage
} from '@nebular/auth';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule
} from '@nebular/theme';
import { TranslocoModule } from '@ngneat/transloco';
import { ThemeModule } from '../theme/theme.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { authOptions, authSettings } from './auth.settings';
import {
  LoginComponent,
  LogoutComponent,
  RegisterComponent,
  RequestPasswordComponent,
  ResetPasswordComponent
} from './components';
import { AuthComponent } from './components/auth.component';
import { RoleGuard } from './role.guard';
import { RoleProvider } from './role.provider';

const GUARDS = [AuthGuard, RoleGuard];

const PIPES = [];

const COMPONENTS = [
  LoginComponent,
  RegisterComponent,
  RequestPasswordComponent,
  ResetPasswordComponent,
  LogoutComponent,
  AuthComponent
];

const NB_MODULES = [
  NbAlertModule,
  NbIconModule,
  NbCardModule,
  NbLayoutModule,
  NbInputModule,
  NbCheckboxModule,
  NbButtonModule
];

export function filterInterceptorRequest(req: HttpRequest<any>): boolean {
  return [
    '/auth/login',
    '/auth/register',
    '/auth/request-password',
    '/auth/refresh-token'
  ].some(url => req.url.includes(url));
}

// @ts-ignore
@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslocoModule,
    ...NB_MODULES,
    AuthRoutingModule,
    NbAuthModule.forRoot(authOptions)
  ],
  providers: [
    NbSecurityModule.forRoot({
      accessControl: authSettings
    }).providers,
    {
      provide: NbRoleProvider,
      useClass: RoleProvider
    },
    {
      provide: NbTokenLocalStorage,
      useClass: NbTokenLocalStorage
    }
  ],
  exports: [...PIPES]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
          useValue: filterInterceptorRequest
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: NbAuthJWTInterceptor,
          multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        ...GUARDS
      ]
    };
  }
}
