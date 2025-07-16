import { Injectable, signal } from '@angular/core';
import { AuthTokens } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private readonly _tokens = signal<AuthTokens | null>(null);

  readonly tokens = this._tokens.asReadonly();

  setTokens(tokens: AuthTokens) {
    this._tokens.set(tokens);
  }

  clearTokens() {
    this._tokens.set(null);
  }

  get isAuthenticated() {
    return this.tokens()?.accessToken ? true : false;
  }

  get userId() {
    return this.tokens()?.userId ?? null;
  }

  get accessToken() {
    return this.tokens()?.accessToken ?? null;
  }

  get refreshToken() {
    return this.tokens()?.refreshToken ?? null;
  }
}
