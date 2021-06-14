import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  public userStatus: Subject<boolean>;

  constructor(private http: HttpClient) {
    this.userStatus = new Subject<boolean>();
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject!.value;
  }

  login(email: string): any {
    return this.http.post<any>(`http://localhost:3000/auth/login`, { email })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject!.next(user);
        }
        return user;
      }));
  }

  loginCheck(email: string): void {
    console.log(email);
    console.log(this.userStatus);
    const response = this.http.post(`http://localhost:3000/auth/login-check`, { email });
    response.subscribe((res: any ) => {
      if (res['access_token']) {
        this.userStatus.next(true);
      } else {
        this.userStatus.next(false);
      }
    });
    // .pipe(map(user => {
    //   if (user) {
    //     this.userStatus.next(true);
    //   } else {
    //     this.userStatus.next(false);
    //   }
    // }));
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject!.next(null);
  }
}
