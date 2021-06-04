import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersComponent } from './component/orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';

@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialUiModule
  ],
  exports: [
    OrdersComponent
  ]
})
export class OrdersModule { }
