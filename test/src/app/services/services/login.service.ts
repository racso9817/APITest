import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  flaskURL = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.flaskURL + 'login', { username, password });
  }

  logout(): Observable<any> {
    let token = localStorage.getItem('token');
    const headers =  new HttpHeaders({
      Authorization: 'Bearer ' + token
    })  
    return this.http.post<any>(this.flaskURL + 'logout',{},{headers});
  }

}
