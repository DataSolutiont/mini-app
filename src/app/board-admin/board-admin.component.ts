import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

interface Response {
  id: number;
  candidate: string;
  status: string;
}

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  filterValue = '';
  showResponses = false;
  responses: Response[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Получаем данные от сервера (например, с откликами кандидатов)
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data.message; // Пример, если API возвращает объект с сообщением
        this.responses = data.responses; // Предполагаем, что API также возвращает отклики
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }

  toggleResponses(): void {
    this.showResponses = !this.showResponses;
  }

  filterResponses(): Response[] {
    return this.responses.filter(response =>
      response.candidate.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }
}
