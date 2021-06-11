import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginCodeComponent } from './component/login-code.component';
import { LoginCodeRoutingModule } from './login-code-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { InputOnlyNumbersDirective } from '../../directives/input-only-numbers.directive';

@NgModule({
  declarations: [
    LoginCodeComponent,
    InputOnlyNumbersDirective
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
