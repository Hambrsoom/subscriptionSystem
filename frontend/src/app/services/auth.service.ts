import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  // loggedInReceived = this.loggedIn.asObservable();

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private http: HttpClient,
    private router: Router) { }

  register(user: User) {
    return this.http.post<any>("http://localhost:3000/auth/signup", user);
  }

  login(user: User){
    return this.http.post<any>("http://localhost:3000/auth/signin", user);
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    return localStorage.removeItem('token');
  }

  getLoggedInStatus(): boolean {
    return this.loggedIn.value;
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }
}
