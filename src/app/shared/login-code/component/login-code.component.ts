import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-code',
  templateUrl: './login-code.component.html',
  styleUrls: ['./login-code.component.scss']
})
export class LoginCodeComponent implements OnInit {

  public focus: boolean;

  constructor() {
    this.focus = false;
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
