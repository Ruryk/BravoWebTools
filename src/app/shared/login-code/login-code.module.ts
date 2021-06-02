import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginCodeComponent } from './login-code/login-code.component';
import { LoginCodeRoutingModule } from './login-code-routing.module';

@NgModule({
  declarations: [
    LoginCodeComponent
  ],
  imports: [
    CommonModule,
    LoginCodeRoutingModule
  ],
  exports: [
    LoginCodeComponent
  ]
})
export class LoginCodeModule {
}
