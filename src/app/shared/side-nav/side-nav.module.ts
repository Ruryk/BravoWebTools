import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavComponent } from './component/side-nav.component';
import { SideNavRoutingModule } from './side-nav-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';

@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    CommonModule,
    SideNavRoutingModule,
    MaterialUiModule
  ],
  exports: [
    SideNavComponent
  ]
})
export class SideNavModule { }
