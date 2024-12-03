import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://46.148.227.14:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, 
    httpOptions);

  }

  register(fio: string, username: string, email: string, password: string, role: string): Observable<any> {

    if (!username || !email || !password || !role) {
      throw new Error('Все поля должны быть заполнены')
    }

    const validRoles = ['HR', 'CANDIDATE'];

    if (!validRoles.includes(role)) {
      throw new Error(`Недопустимая роль: "${role}". Допустимые роли: ${validRoles.join(',')}`);
    }

    return this.http.post(AUTH_API + 'signup', {
      fio,
      username,
      email,
      password,
      role
    }, httpOptions);
  }
}
