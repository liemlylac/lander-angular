import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';

@NgModule({
  imports: [CommonModule, ErrorRoutingModule],
  declarations: [
    ErrorComponent,
    NotFoundComponent,
    ForbiddenComponent,
    ServerErrorComponent
  ]
})
export class ErrorModule {}
