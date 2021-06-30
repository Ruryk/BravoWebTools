import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit, OnDestroy {
  public unsubscribe$: Subject<void>;
  public loginGroup: FormGroup;
  public focus: boolean;
  public userStatus: string;

  constructor(
    private authentication: AuthenticationService
  ) {
    this.unsubscribe$ = new Subject<void>();
    this.userStatus = '';
    this.focus = false;
    this.loginGroup = new FormGroup({
      login: new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')
        ]
      )
    });
  }

  ngOnInit(): void {
    this.loginGroup.get('login')?.statusChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(status => {
        if (status === 'VALID') {
          this.authentication.loginCheck(this.loginGroup.get('login')?.value)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
              (res: any) => {
                if (res) {
                  this.userStatus = 'VALID';
                } else {
                  this.userStatus = 'INVALID';
                }
              },
              (error => this.userStatus = 'INVALID')
            );
        } else {
          this.userStatus = '';
        }
      });
  }

  focusIn(): void {
    this.focus = true;
  }

  focusOut(): void {
    this.focus = false;
  }

  submitLoginForm(): void {
    this.authentication.verification(this.loginGroup.get('login')?.value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
