import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { LoginModule } from '../login/login.module';
import { LoginCodeModule } from '../login-code/login-code.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialUiModule,
    LoginModule,
    LoginCodeModule
  ],
  exports: [
    MaterialUiModule,
    LoginModule,
    LoginCodeModule
  ]
})
export class SharedModule {
}
