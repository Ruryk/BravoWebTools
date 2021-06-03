import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersComponent } from './component/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';

@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MaterialUiModule
  ],
  exports: [
    CustomersComponent
  ]
})
export class CustomersModule { }
