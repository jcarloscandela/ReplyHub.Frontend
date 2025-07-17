import { Injectable, signal } from '@angular/core';
import { AuthTokens } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private readonly TOKEN_KEY = 'auth_tokens';
  private readonly _tokens = signal<AuthTokens | null>(this.loadTokens());
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  private loadTokens(): AuthTokens | null {
    const raw = localStorage.getItem(this.TOKEN_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  readonly tokens = this._tokens.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  setTokens(tokens: AuthTokens) {
    this._tokens.set(tokens);
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokens));
  }

  clearTokens() {
    this._tokens.set(null);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  setLoading(loading: boolean) {
    this._loading.set(loading);
  }

  setError(error: string | null) {
    this._error.set(error);
  }

  clearError() {
    this._error.set(null);
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
