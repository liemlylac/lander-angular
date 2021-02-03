import { Injectable } from '@angular/core';
import { AuthToken } from '@auth/services/auth.token';

interface TokenPackage {
  name: string;
  createdAt: number;
  value: string;
}

@Injectable()
export class TokenStorage {
  protected key = 'token';

  get(): AuthToken {
    const rawValue = localStorage.getItem(this.key);
    let name = '';
    let createdAt: Date = null;
    let value = '';

    const tokenPack: TokenPackage = this.parseTokenPack(rawValue);
    if (tokenPack) {
      name = tokenPack.name;
      createdAt = new Date(Number(tokenPack.createdAt));
      value = tokenPack.value;
    }
    return new AuthToken(name, value, createdAt);
  }

  set(token): void {
    const tokenPack: TokenPackage = {
      name: token.getName(),
      createdAt: token.getCreatedAt().getTime(),
      value: token.toString()
    };
    const rawValue = JSON.stringify(tokenPack);
    localStorage.setItem(this.key, rawValue);
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }

  /**
   * Parse value to token pack does not through error
   * if value is not in JSON format
   * return null
   */
  protected parseTokenPack(value: string): TokenPackage | null {
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }
}
