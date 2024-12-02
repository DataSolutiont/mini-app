import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    fio: '',
    username: '',
    email: '',
    password: '',
    role: ''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(): void {
    const { fio, username, email, password, role } = this.form;

    if (!role) {
      this.errorMessage = 'Роль обязательна для заполнения ';
      this.isSignUpFailed = true;
      return;
    }

    if (!['CANDIDATE', 'HR'].includes(role)) {
      this.errorMessage = "Выберите корректную роль: CANDIDATE или HR";
      this.isSignUpFailed = true;
      return;
    }

    // Регистрируем пользователя
    this.authService.register(fio, username, email, password, role).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        // Выполняем автоматическую аутентификацию
        this.authService.login(username, password).subscribe({
          next: loginData => {
            // Успешная аутентификация
            console.log('User authentication successful', loginData);
            // Перенаправляем пользователя на базу или другую страницу в зависимости от его роли
            if (loginData.role === 'HR') {
              this.router.navigate(['/profile']);
            } else if (loginData.role === 'CANDIDATE') {
              this.router.navigate(['/admin']);
            }
          },
          error: loginError => {
            console.error('Error during login after registration:', loginError);
            this.errorMessage = loginError.error.message || 'Ошибка входа после регистрации';
            this.isSignUpFailed = true;
          }
        });
      },
      error: err => {
        console.error(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
