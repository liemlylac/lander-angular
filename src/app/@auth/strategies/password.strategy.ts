import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthResult } from '../auth-result';

interface RequestOptions {
  body?: any;
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body' | 'response';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  withCredentials?: boolean;
}

@Injectable({ providedIn: 'root' })
export class PasswordStrategy {
  protected endpoints = {
    login: 'auth/login',
    logout: 'auth/logout',
    register: 'auth/register',
    requestPwd: 'auth/request-password',
    verifyResetToken: 'auth/verify-reset-password-token',
    resetPwd: 'auth/reset-password',
  };

  constructor(
    protected http: HttpService,
  ) {}

  protected request(method: string, url: string, data?: any, options?: RequestOptions): Observable<AuthResult> {
    return this.http.request(method, url, data, { observe: 'response', ...options })
      .pipe(
        map((res) => {
          return new AuthResult({
            success: true,
            response: res,
            redirect: res.redirect,
            token: res.token
          });
        }),
        catchError((err) => {
          return this.handleErrorResponse(err);
        })
      );
  }

  protected handleErrorResponse(err): Observable<AuthResult> {
    return of(new AuthResult({
      success: false,
      response: err,
      errors: [err.error.message],
    }));
  }

  login(data): Observable<AuthResult> {
    return this.request('POST', this.endpoints.login, data);
  }

  logout(data): Observable<AuthResult> {
    return this.request('POST', this.endpoints.logout, data);
  }

  register(data): Observable<AuthResult> {
    return this.request('POST', this.endpoints.register, data);
  }

  requestPassword(data): Observable<AuthResult> {
    return this.request('POST', this.endpoints.requestPwd, data);
  }

  verifyResetToken(token): Observable<AuthResult> {
    let url = this.endpoints.verifyResetToken;
    url += `?token=${token}`;
    return this.request('GET', url);
  }

  resetPassword(data, token): Observable<AuthResult> {
    let url = this.endpoints.resetPwd;
    url += `?token=${token}`;
    return this.request('POST', url, data);
  }
}
