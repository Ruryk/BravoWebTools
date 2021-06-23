import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './component/main.component';
import { CustomersComponent } from '../customers/component/customers.component';
import { CatalogComponent } from '../catalog/component/catalog.component';
import { OrdersComponent } from '../orders/component/orders.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'customers',
        pathMatch: 'full'
      },
      {
        path: 'customers',
        component: CustomersComponent,
        pathMatch: 'full'
      },
      {
        path: 'catalog',
        component: CatalogComponent,
        pathMatch: 'full'
      },
      {
        path: 'orders',
        component: OrdersComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
