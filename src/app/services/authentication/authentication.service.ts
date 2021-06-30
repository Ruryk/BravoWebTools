import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import { config } from 'src/app/constantes/constantes';

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
export class AuthenticationService implements OnDestroy {
  private currentUserSubject: BehaviorSubject<User | null>;
  public unsubscribe$: Subject<void>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.unsubscribe$ = new Subject<void>();
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject!.value;
  }

  verification(email: string): any {
    this.http.post<any>(`${config.server}/authentication/verification`, { email })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => this.responseHandlerSuccess(res, email),
        (error) => this.responseHandlerError(error)
      );
  }

  login(email: string, code: string): any {
    this.http.post<any>(`${config.server}/authentication/login`, { email, code })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => this.responseHandlerSuccess(res, email),
        (error) => this.responseHandlerError(error)
      );
  }

  loginStatus(): Observable<object> {
    const token = localStorage.getItem('userToken');
    return this.http.post<any>(`${config.server}/authentication/login-token`, { token });
  }

  loginCheck(email: string): Observable<object> {
    return this.http.post(`${config.server}/authentication/check-user`, { email });
  }

  codeCheck(email: string, code: string): Observable<object> {
    return this.http.post(`${config.server}/authentication/check-code`, { email, code });
  }

  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }

  responseHandlerSuccess(res: any, email: string): void {
    const keyToken = 'access_token';
    const userEmail = 'userEmail';
    if (res[keyToken]) {
      localStorage.removeItem(userEmail);
      localStorage.setItem('userToken', res[keyToken]);
      this.router.navigate(['/']);
    } else {
      localStorage.setItem('userEmail', email);
      this.router.navigate(['/verification']);
    }
  }

  responseHandlerError(res: any): void {
    console.log(res);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
