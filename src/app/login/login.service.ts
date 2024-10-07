import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/user-registry/login';

  constructor(private http: HttpClient) { }

  loginUser(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
}