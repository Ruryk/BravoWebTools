import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginCodeComponent } from './login-code/login-code.component';


@NgModule({
  declarations: [
    LoginCodeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoginCodeComponent
  ]
})
export class LoginCodeModule {
}
