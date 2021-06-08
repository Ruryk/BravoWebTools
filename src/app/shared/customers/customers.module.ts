import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomersComponent } from './component/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { AddCustomerModalComponent } from './component/add-customer-modal/add-customer-modal.component';
import { EditCustomerModalComponent } from './component/edit-customer-modal/edit-customer-modal.component';

@NgModule({
  declarations: [
    CustomersComponent,
    AddCustomerModalComponent,
    EditCustomerModalComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MaterialUiModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomersComponent
  ]
})
export class CustomersModule {
}
