import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { catchError } from 'rxjs/operators'; // Импортируем catchError для обработки ошибок

const API = 'http://localhost:80/api/cvs/saveCv/';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private authService: AuthService) {}

  public uploadResume(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('resume', file, file.name);

    // Получаем токен авторизации
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log('Uploading resume...', { fileName: file.name, token });

    // Используем catchError для обработки ошибок
    return this.http.post(API, formData, { headers }).pipe(
      catchError(error => {
        console.error('Upload error:', error); // Логируем ошибку
        throw error; // Перебрасываем ошибку обратно
      })
    );
  }

  public canUploadResume(): boolean {
    const user = this.tokenStorage.getUser(); // Получаем пользователя из токен-сервиса
    if (user && user.roles && Array.isArray(user.roles)) {
      // Проверяем, есть ли у пользователя роль 'CANDIDATE'
      return user.roles.includes('CANDIDATE'); // Используйте 'CANDIDATE' с заглавными буквами
    }
    return false;
  }
}
