import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Login } from '../models/auth';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  signup(value: any) {
    throw new Error('Method not implemented.');
  }
  private loginApi = 'http://localhost:3000/api/login';
  private registerApi = 'http://localhost:3000/api/register';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedInn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.isLoggedInSubject.next(true);
    }
  }

  login(loginDetails: Login): Observable<any> {
    const body = {
      email: loginDetails.email,
      password: loginDetails.password
    };
    return this.http.post(this.loginApi, body);
  }

  // signup(signupDetails: any): Observable<any> {
  //   return this.http.post(this.signupApi, signupDetails);
  // }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }
  register(userDetails: any): Observable<any> {
    console.log("user details",userDetails);
    console.log(this.registerApi);
    return this.http.post("http://localhost:3000/api/register", userDetails);
}

  getDataFromToken(key: string): string | null {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && decodedToken[key]) {
        return decodedToken[key];
      } else {
        console.error(`Key "${key}" not found in the token.`);
        return null;
      }
    } catch (error) {
      console.error('Token decoding error', error);
      return null;
    }
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logOutSession(): void {
    sessionStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }
}
