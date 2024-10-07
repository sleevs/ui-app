import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/user-registry';

  constructor(private http: HttpClient) { }

  createUser(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuario`, usuario);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }




}