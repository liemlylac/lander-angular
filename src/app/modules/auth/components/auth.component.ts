import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <router-outlet></router-outlet>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {}
