import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LoginComponent,
  LogoutComponent,
  RegisterComponent,
  RequestPasswordComponent,
  ResetPasswordComponent
} from './components';
import { AuthComponent } from './components/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent
        //component: NbLoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
        //component: NbLoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
        //component: NbRegisterComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
        //component: NbLogoutComponent
      },
      {
        path: 'request-password',
        component: RequestPasswordComponent
        //component: NbRequestPasswordComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
        //component: NbResetPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
