import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MaterialUiModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginCodeComponent
  ]
})
export class LoginCodeModule {
}
