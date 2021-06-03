import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './component/main.component';
import { MainRoutingModule } from './main-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { SideNavModule } from '../side-nav/side-nav.module';
import { CustomersModule } from '../customers/customers.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialUiModule,
    SideNavModule,
    CustomersModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule {
}
