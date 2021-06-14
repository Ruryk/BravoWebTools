import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthenticationService]
})
export class LoginComponent implements OnInit {

  public loginGroup: FormGroup;
  public focus: boolean;
  public userStatus: boolean;

  constructor(
    private authentication: AuthenticationService
  ) {
    this.userStatus = false;
    this.authentication.userStatus.subscribe(res => this.userStatus = res);
    this.focus = false;
    this.loginGroup = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3,4}$')])
    });
  }

  ngOnInit(): void {
    this.authentication.userStatus.subscribe(res => this.userStatus = res);
    this.loginGroup.statusChanges.subscribe(res => {
      (res === 'VALID') ? this.authentication.loginCheck(this.loginGroup.get('login')?.value) : console.log('user not' + ' found');
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

}
