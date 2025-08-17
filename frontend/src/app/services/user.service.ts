import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';   

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<any[]> {
    const token = this.authService .getToken();
    console.log("UserService.getUsers() - Token:", token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.apiUrl+"/", { headers });
  }

  getUserById(id: string): Observable<any> {
    const token = this.authService.getToken();
    console.log("UserService.getUsers() - Token:", token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  } 
}