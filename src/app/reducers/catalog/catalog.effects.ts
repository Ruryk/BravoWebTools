import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';

import {
  AddNewCatalogFailAction,
  AddNewCatalogSuccessAction,
  catalogActionsType,
  DeleteCatalogFailAction,
  DeleteCatalogSuccessAction,
  EditCatalogFailAction,
  EditCatalogSuccessAction
} from 'src/app/reducers/catalog/catalog.actions';
import { DataService } from '../../services/data/data.service';
import { Observable, of, from } from 'rxjs';

@Injectable()
export class CatalogEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
  ) {
  }

  catalogAddAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(catalogActionsType.addNewCatalog),
        mergeMap((action: any): Observable<any> => {
          return this.dataService.addNewCatalog(action.payload.data).pipe(
            map((res: object) => {
              if (res) {
                return new AddNewCatalogSuccessAction({ code: action.payload.code, data: action.payload.data });
              }
              throw new Error();
            }),
            catchError((s) => of(new AddNewCatalogFailAction({ error: { status: true, message: 'Error adding catalog' } })))
          );
        })
      ),
    { useEffectsErrorHandler: false }
  );

  catalogEditAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(catalogActionsType.editCatalog),
        mergeMap((action: any): Observable<any> => {
          return this.dataService.editCatalog(action.payload.code, action.payload.data).pipe(
            map((res: object) => {
              if (res) {
                return new EditCatalogSuccessAction({
                  code: action.payload.code,
                  newCode: action.payload.newCode,
                  data: action.payload.data
                });
              }
              throw new Error();
            }),
            catchError((s) => of(new EditCatalogFailAction({ error: { status: true, message: 'Error editing catalog' } })))
          );
        })
      ),
    { useEffectsErrorHandler: false }
  );

  catalogDeleteAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(catalogActionsType.deleteCatalog),
        mergeMap((action: any): Observable<any> => {
          return this.dataService.deleteCatalog(action.payload.code).pipe(
            map((res: object) => {
              if (!res) {
                return new DeleteCatalogSuccessAction({
                  code: action.payload.code
                });
              }
              throw new Error();
            }),
            catchError((s) => of(new DeleteCatalogFailAction({ error: { status: true, message: 'Error deleting catalog' } })))
          );
        })
      ),
    { useEffectsErrorHandler: false }
  );
}
