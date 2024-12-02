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

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { fio, username, email, password, role } = this.form;

    if (!role) {
      this.errorMessage = 'Роль обязательна для заполнения ';
      this.isSignUpFailed = true;
      return;
    }

    if (!['CANDIDATE', 'HR'].includes(role)) {
      this.errorMessage = "Выберите корруктную роль: CANDIDATE или HR";
      this.isSignUpFailed = true;
      return;
    }

    this.authService.register(fio, username, email, password, role).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;

          if (data.role === 'HR') {
            this.router.navigate(['/profile']);
          } else if (data.role === 'CANDIDATE') {
            this.router.navigate(['/admin'])
          }
      },
      error: err => {
        console.error(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
