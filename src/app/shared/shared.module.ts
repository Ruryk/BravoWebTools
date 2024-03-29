import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialUiModule } from './material-ui/material-ui.module';
import { LoginModule } from './login/login.module';
import { LoginCodeModule } from './login-code/login-code.module';
import { MainModule } from './main/main.module';
import { CustomersModule } from './customers/customers.module';
import { CatalogModule } from './catalog/catalog.module';
import { OrdersModule } from './orders/orders.module';
import { NotFoundModule } from './not-found/not-found.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialUiModule,
    LoginModule,
    LoginCodeModule,
    MainModule,
    CustomersModule,
    CatalogModule,
    OrdersModule,
    NotFoundModule
  ],
  exports: [
    MaterialUiModule,
    LoginModule,
    LoginCodeModule,
    MainModule,
    CustomersModule,
    CatalogModule,
    OrdersModule,
    NotFoundModule
  ]
})
export class SharedModule {
}
