import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginCodeComponent } from './component/login-code.component';

const routes: Routes = [
  { path: '', component: LoginCodeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginCodeRoutingModule {
}

