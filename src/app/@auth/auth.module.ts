import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { TokenService } from '@auth/services/token.service';
import { TokenStorage } from '@auth/services/token/token.storage';
import { PasswordStrategy } from '@auth/strategies';
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
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './auth.guard';
import {
  AuthComponent,
  LoginComponent,
  LogoutComponent,
  RegisterComponent,
  RequestPasswordComponent,
  ResetPasswordComponent
} from './components';
import { RoleGuard } from './role.guard';

const GUARDS = [AuthGuard, RoleGuard];

const NB_MODULES = [
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
];


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslocoModule,
    AuthRoutingModule,
    ...NB_MODULES,
  ],
  providers: [
    DeviceDetectorService,
    AuthService,
    TokenService,
    TokenStorage,
    PasswordStrategy,
    ...GUARDS
  ],
  exports: []
})
export class AuthModule {
}
