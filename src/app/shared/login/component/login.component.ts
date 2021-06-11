import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginGroup: FormGroup;
  public focus: boolean;

  constructor() {
    this.focus = false;
    this.loginGroup = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }

  focusIn(): void{
    this.focus = true;
  }

  focusOut(): void{
    this.focus = false;
  }

}
