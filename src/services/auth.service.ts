import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private userRole: string = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('userRole') ? sessionStorage.getItem('userRole')! : '';

  constructor(private http: HttpClient) {}
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem('auth_token', response.token);
          sessionStorage.setItem('userID', response.userId);
          sessionStorage.setItem('userRole', response.role);
        }
      }))
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }

  getUserRole(): string {
    return this.userRole;
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      tap((response: any) => {
        sessionStorage.setItem('auth_token', response.token);
        sessionStorage.setItem('userID', response.userId);
        sessionStorage.setItem('userRole', response.role);
      }));
  }
}