import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorComponent,
    children: [
      {
        path: 'forbidden',
        component: ForbiddenComponent
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: 'internal-server-error',
        component: ServerErrorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule {}
