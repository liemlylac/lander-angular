import { Injectable } from '@angular/core';
import { AuthToken } from '@auth/services/auth.token';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, share } from 'rxjs/operators';
import { TokenStorage } from './token/token.storage';

@Injectable({ providedIn: 'root' })
export class TokenService {
  protected token$: BehaviorSubject<AuthToken> = new BehaviorSubject(null);

  constructor(
    protected tokenStorage: TokenStorage,
  ) {
    this.emitTokenChange();
  }

  tokenChange(): Observable<AuthToken> {
    return this.token$.pipe(
      filter(value => !!value),
      share(),
    );
  }

  set(token: AuthToken): void {
    this.tokenStorage.set(token);
    this.emitTokenChange();
  }

  get(): Observable<AuthToken> {
    return of(this.tokenStorage.get());
  }

  clear(): Observable<null> {
    this.tokenStorage.clear();
    this.emitTokenChange();
    return of(null);
  }

  protected emitTokenChange(): void {
    this.token$.next(this.tokenStorage.get());
  }
}
