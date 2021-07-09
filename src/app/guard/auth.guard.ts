import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { takeUntil, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {
  public unsubsribe$: Subject<void>;

  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {
    this.unsubsribe$ = new Subject<void>();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canProceed();
  }

  private canProceed(): Observable<boolean | UrlTree> {
    return this.authentication.loginStatus()
      .pipe(takeUntil(this.unsubsribe$),
        map((user: any) => {
          if (user.token) {
            localStorage.setItem('userToken', user.token);
            return true;
          }
          localStorage.removeItem('userToken');
          return this.router.createUrlTree(['/login']);
        }),
        map(data => {
          return data;
        })
      );
  }

  ngOnDestroy(): void {
    this.unsubsribe$.next();
    this.unsubsribe$.complete();
  }

}
