import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialUiModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {
}
