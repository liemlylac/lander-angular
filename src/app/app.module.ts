import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbMenuModule, NbSidebarModule } from '@nebular/theme';
import { TranslocoModule } from '@ngneat/transloco';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { ThemeModule } from './modules/theme/theme.module';
import { TranslocoRootModule } from './modules/transloco/transloco-root.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    TranslocoModule,
    TranslocoRootModule,
    ThemeModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
