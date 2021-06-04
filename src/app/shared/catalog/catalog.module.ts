import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './component/catalog.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';



@NgModule({
  declarations: [
    CatalogComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    MaterialUiModule
  ],
  exports: [
    CatalogComponent
  ]
})
export class CatalogModule { }
