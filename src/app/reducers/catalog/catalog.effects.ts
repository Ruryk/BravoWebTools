import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

import { AddNewCatalogAction, AddNewCatalogSubmitAction, catalogActionsType } from 'src/app/reducers/catalog/catalog.actions';
import { IState } from 'src/app/reducers/index';
import { ICatalog } from '../../interfaces/interfaces';
import { DataService } from '../../services/data/data.service';

@Injectable()
export class CatalogEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) {
  }

  catalogAddAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(catalogActionsType.addNewCatalog),
        map((action: any): any => {
          this.dataService.addNewCatalog(action.payload.data).then(res => {
            return new AddNewCatalogSubmitAction({ code: action.payload.code, data: action.payload.data });
          });
          return new AddNewCatalogSubmitAction({ code: action.payload.code, data: action.payload.data });
        })
      ),
    { useEffectsErrorHandler: false }
  );
}
