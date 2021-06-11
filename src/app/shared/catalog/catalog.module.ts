import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './component/catalog.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { DeleteCatalogModalComponent } from './component/delete-catalog-modal/delete-catalog-modal.component';
import { ReplaceCatalogModalComponent } from './component/replace-catalog-modal/replace-catalog-modal.component';

@NgModule({
  declarations: [
    CatalogComponent,
    DeleteCatalogModalComponent,
    ReplaceCatalogModalComponent
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
