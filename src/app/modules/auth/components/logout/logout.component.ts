import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-logout',
  template: `
    <div>{{ 'Logging out' | transloco }}</div>
  `
})
export class LogoutComponent implements OnInit {
  constructor(
    private readonly authService: NbAuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.logout('email');
  }

  logout(strategy: string): void {
    this.authService.logout(strategy).subscribe(res => {
      const redirect = res.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, 125);
      }
    });
  }
}
