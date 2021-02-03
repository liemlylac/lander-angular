import { Component, OnInit } from '@angular/core';
import { SessionService } from '@auth/services/session.service';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <div class="auth-container">
              <router-outlet></router-outlet>
            </div>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `
})
export class AuthComponent implements OnInit {
  constructor(
    protected sessionService: SessionService
  ) {
  }

  ngOnInit(): void {
    if (!this.sessionService.hasClientId()) {
      this.sessionService.initSession();
    }
  }
}
