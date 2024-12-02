import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonUserService {
  baseUrl:any = environment.baseURL;

  constructor(private http:HttpClient) { }


  getUser() {
    return this.http.get(this.baseUrl);
  }
}
