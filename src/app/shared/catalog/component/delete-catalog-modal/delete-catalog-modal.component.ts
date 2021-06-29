import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IState } from 'src/app/reducers';
import { DeleteCatalogAction } from 'src/app/reducers/catalog/catalog.actions';

@Component({
  selector: 'app-delete-catalog-modal',
  templateUrl: './delete-catalog-modal.component.html',
  styleUrls: ['./delete-catalog-modal.component.scss']
})
export class DeleteCatalogModalComponent implements OnInit {
  public catalogCode: string;
  public catalogName: string;

  constructor(
    private store: Store<IState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.catalogCode = data.catalogCode;
    this.catalogName = data.catalogName;
  }

  ngOnInit(): void {
  }

  deleteCatalog(): void {
    this.store.dispatch(new DeleteCatalogAction({ code: this.catalogCode }));
  }

}
