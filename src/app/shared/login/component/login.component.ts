import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3,4}$')
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
              (res: any) => this.userStatus = 'VALID',
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

  submitLoginForm(event: any): void {

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
