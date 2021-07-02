import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrdersComponent } from './component/orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { SelectFilterMenuComponent } from '../custom-ui/select-filter-menu/select-filter-menu.component';
import { EffectsModule } from '@ngrx/effects';
import { OrdersEffects } from '../../reducers/orders/orders.effects';

@NgModule({
  declarations: [
    OrdersComponent,
    SelectFilterMenuComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialUiModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([OrdersEffects])
  ],
  exports: [
    OrdersComponent
  ]
})
export class OrdersModule {
}
