import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private isLogin : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLogin$ = this.isLogin.asObservable();


  constructor(private http: HttpClient) {}
  login(credentials: { email: string; password: string }): Observable<any> {
    this.isLogin.next(true);
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        sessionStorage.setItem('auth_token', response.token);
        sessionStorage.setItem('userID', response.userId);
        sessionStorage.setItem('userRole', response.role);
      }))
  }

  getIsLogin(): Observable<boolean> {
    return this.isLogin;
  }

  getUserRole(): string {
    return sessionStorage.getItem('userRole')! ? sessionStorage.getItem('userRole')! : '';
  }

  register(data: any): Observable<any> {
    this.isLogin.next(true);
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      tap((response: any) => {
        sessionStorage.setItem('auth_token', response.token);
        sessionStorage.setItem('userID', response.userId);
        sessionStorage.setItem('userRole', response.role);
      }));
  }
}