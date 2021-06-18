import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintViewComponent } from './component/print-view.component';
import { PrintViewRoutingModule } from './print-view-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';

@NgModule({
  declarations: [
    PrintViewComponent
  ],
  imports: [
    CommonModule,
    PrintViewRoutingModule,
    MaterialUiModule
  ],
  exports: [
    PrintViewComponent
  ]
})
export class PrintViewModule {
}
