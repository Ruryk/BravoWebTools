import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CatalogComponent } from './component/catalog.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { DeleteCatalogModalComponent } from './component/delete-catalog-modal/delete-catalog-modal.component';
import { ReplaceCatalogModalComponent } from './component/replace-catalog-modal/replace-catalog-modal.component';
import { AddCatalogModalComponent } from './component/add-catalog-modal/add-catalog-modal.component';
import { EditCatalogModalComponent } from './component/edit-catalog-modal/edit-catalog-modal.component';
import { EffectsModule } from '@ngrx/effects';
import { CatalogEffects } from '../../reducers/catalog/catalog.effects';

@NgModule({
  declarations: [
    CatalogComponent,
    DeleteCatalogModalComponent,
    ReplaceCatalogModalComponent,
    AddCatalogModalComponent,
    EditCatalogModalComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    MaterialUiModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([CatalogEffects])
  ],
  exports: [
    CatalogComponent
  ]
})
export class CatalogModule { }
