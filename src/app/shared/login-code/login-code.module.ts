import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginCodeComponent } from './component/login-code.component';
import { LoginCodeRoutingModule } from './login-code-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';

@NgModule({
  declarations: [
    LoginCodeComponent
  ],
  imports: [
    CommonModule,
    LoginCodeRoutingModule,
    MaterialUiModule
  ],
  exports: [
    LoginCodeComponent
  ]
})
export class LoginCodeModule {
}
