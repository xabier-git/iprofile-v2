import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Ajusta la URL según tu backend
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log("AuthService.login()", { username, password });
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        console.log("AuthService.login() token", response.token);
        sessionStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  register(data: any): Observable<any> {
    console.log("AuthService.register()", data);
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  logout(): void {
    console.log("AuthService.logout()");
    sessionStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    // Verifica si hay un token en el almacenamiento local
    const isAuthenticated = !!sessionStorage.getItem(this.tokenKey);
    console.log("AuthService.isAuthenticated("+isAuthenticated+")");
    return isAuthenticated;
  }

  getToken(): string | null {
    console.log("AuthService.getToken("+this.tokenKey+")");
    return sessionStorage.getItem(this.tokenKey);
  }
}