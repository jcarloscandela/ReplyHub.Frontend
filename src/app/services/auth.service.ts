import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { environment } from '../../environments/environment';
import { AuthStore } from '../store/auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.backendUrl}/auth`;

  constructor(private http: HttpClient, private authStore: AuthStore) {}

  login(payload: LoginRequest): Observable<LoginResponse> {
    this.authStore.setLoading(true);
    this.authStore.clearError();
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, payload).pipe(
      tap((res) => {
        this.authStore.setTokens({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          userId: res.user.id.toString()
        });
        this.authStore.setLoading(false);
      }),
      catchError((err) => {
        this.authStore.setError(err?.error?.message || 'Login failed');
        this.authStore.setLoading(false);
        return throwError(() => err);
      })
    );
  }

  refreshToken(refreshToken: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/refresh-token`, { refreshToken });
  }

  isLoggedIn(): boolean {
    return !!this.authStore.accessToken;
  }
}
