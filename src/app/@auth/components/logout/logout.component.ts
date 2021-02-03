import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';


@Component({
  selector: 'app-logout',
  template: `
    <div>{{ 'Logging out' | transloco }}...</div>
  `
})
export class LogoutComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.logout('email');
  }

  logout(strategy: string): void {
    this.authService.passwordLogout(strategy).subscribe(res => {
      const redirect = res.getRedirect();
      if (redirect) {
        return this.router.navigateByUrl(redirect);
      }
    });
  }
}
