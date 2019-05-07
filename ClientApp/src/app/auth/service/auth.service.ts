import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { User } from '../../../../models/User';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  SignIn(user: User): Observable<any> {
    return this.http.post("https://localhost:5001/api/signin", user);
  }

  SignUp(user: User): Observable<any> {
    return this.http.post('https://localhost:5001/api/signup', user);
  }

  checkEmailNotTaken(user: User): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post('https://localhost:5001/api/signin/ExistUser', JSON.stringify(user), httpOptions)
  }
}