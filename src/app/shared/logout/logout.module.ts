import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutComponent } from './component/logout.component';
import { LogoutRoutingModule } from './logout-routing.module';

@NgModule({
  declarations: [
    LogoutComponent
  ],
  imports: [
    CommonModule,
    LogoutRoutingModule
  ],
  exports: [
    LogoutComponent
  ]
})
export class LogoutModule {
}
