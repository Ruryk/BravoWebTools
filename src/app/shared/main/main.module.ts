import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { SideNavModule } from '../side-nav/side-nav.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialUiModule,
    SideNavModule
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule {
}
