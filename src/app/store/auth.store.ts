import { Injectable, signal } from '@angular/core';
import { AuthTokens } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private readonly _tokens = signal<AuthTokens | null>(null);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly tokens = this._tokens.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  setTokens(tokens: AuthTokens) {
    this._tokens.set(tokens);
  }

  clearTokens() {
    this._tokens.set(null);
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
