import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('src/app/shared/main/main.module').then(m => m.MainModule) },
  { path: 'login', loadChildren: () => import('src/app/shared/login/login.module').then(m => m.LoginModule) },
  { path: 'login-code', loadChildren: () => import('src/app/shared/login-code/login-code.module').then(m => m.LoginCodeModule) },
  // { path: '**', loadChildren: () => import('src/app/shared/error/error.module').then(m => m.ErrorModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
