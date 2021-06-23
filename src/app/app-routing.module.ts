import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { OrdersResolverService } from './services/orders-resolver/orders-resolver.service';

const routes: Routes = [
  { path: '', loadChildren: () => import('src/app/shared/main/main.module').then(m => m.MainModule) },
  // { path: '', loadChildren: () => import('src/app/shared/main/main.module').then(m => m.MainModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('src/app/shared/login/login.module').then(m => m.LoginModule) },
  { path: 'logout', loadChildren: () => import('src/app/shared/logout/logout.module').then(m => m.LogoutModule) },
  { path: 'verification', loadChildren: () => import('src/app/shared/login-code/login-code.module').then(m => m.LoginCodeModule) },
  {
    path: 'orders/:id', loadChildren: () => import('src/app/shared/print-view/print-view.module').then(m => m.PrintViewModule),
    resolve: { post: OrdersResolverService }
  },
  // { path: '**', loadChildren: () => import('src/app/shared/error/error.module').then(m => m.ErrorModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
