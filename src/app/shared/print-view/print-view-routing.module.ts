import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrintViewComponent } from './component/print-view.component';

const routes: Routes = [
  { path: '', component: PrintViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintViewRoutingModule {
}

