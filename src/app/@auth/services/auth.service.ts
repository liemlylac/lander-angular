import { Injectable } from '@angular/core';
import { AuthResult } from '@auth/auth-result';
import { PasswordStrategy } from '@auth/strategies';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    protected passwordStrategy: PasswordStrategy,
  ) {
  }

  passwordLogin(data: unknown): Observable<AuthResult> {
    return this.passwordStrategy.login(data);
  }

  passwordLogout(data: unknown): Observable<AuthResult> {
    return this.passwordStrategy.logout(data);
  }

  passwordRegister(data: unknown): Observable<AuthResult> {
    return this.passwordStrategy.register(data);
  }

  passwordRequest(data: unknown): Observable<AuthResult> {
    return this.passwordStrategy.requestPassword(data);
  }

  passwordVerifyResetToken(token: string): Observable<AuthResult> {
    return this.passwordStrategy.verifyResetToken(token);
  }

  passwordReset(data: unknown, token: string): Observable<AuthResult> {
    return this.passwordStrategy.resetPassword(data, token);
  }
}
