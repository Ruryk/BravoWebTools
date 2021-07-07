import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './component/main.component';

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
        loadChildren: () => import('src/app/shared/customers/customers.module').then(m => m.CustomersModule),
        pathMatch: 'full'
      },
      {
        path: 'catalog',
        loadChildren: () => import('src/app/shared/catalog/catalog.module').then(m => m.CatalogModule),
        pathMatch: 'full'
      },
      {
        path: 'orders',
        loadChildren: () => import('src/app/shared/orders/orders.module').then(m => m.OrdersModule),
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
