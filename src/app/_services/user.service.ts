import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:80/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userRoles: string[] = [];

  constructor(private http: HttpClient) {}

  setRoles(roles: string[]) {
    this.userRoles = roles.slice(0); // Сохраняем роли пользователя
  }

  getRoles() {
    return this.userRoles; // Возвращаем роли
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Получаем токен
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '', // Устанавливаем заголовок
    });
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

submitResume(resumeData: any): Observable<any> {
  return this.http.post(`${API_URL}resume`, resumeData);
}

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }
}
