import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<string> {
    return this.http.post<string>('http://localhost:9090/authUser', {userName: username, userPassword: password});
  }
  
  register(userName: string, userPassword: string, userEmail: string, userFirstname: string, userLastName: string, gender: string, birthDate: string): Observable<string> {
    return this.http.post<string>('http://localhost:9090/register', {userName, userPassword, userEmail, userFirstname, userLastName, contactInformation: 'test', roles: 'USER', gender, birthDate});
  }

}
