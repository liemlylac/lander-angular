import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthModule } from '@auth/auth.module';
import { UserApi } from '@core/api/user.api';
import { InitUserService } from '@theme/services/init-user.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { UserService } from './services/user.service';

const API = [
  UserApi,
];

const SERVICES = [
  UserService,
  InitUserService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    AuthModule,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...API,
        ...SERVICES,
      ]
    };
  }
}
