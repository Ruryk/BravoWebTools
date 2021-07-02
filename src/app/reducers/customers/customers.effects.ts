import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { DataService } from '../../services/data/data.service';
import { Observable, of } from 'rxjs';
import {
  customersActionsType,
  AddNewCustomersFailAction,
  AddNewCustomersSuccessAction,
  EditCustomersFailAction,
  EditCustomersSuccessAction
} from './customers.actions';

@Injectable()
export class CatalogEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
  ) {
  }

  customersAddAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(customersActionsType.addNewCustomers),
        mergeMap((action: any): Observable<any> => {
          return this.dataService.addNewCustomers(action.payload.data).pipe(
            map((res: object) => {
              if (res) {
                return new AddNewCustomersSuccessAction({ code: action.payload.code, data: action.payload.data });
              }
              throw new Error();
            }),
            catchError((s) => of(new AddNewCustomersFailAction({ message: 'Error adding catalog' })))
          );
        })
      ),
    { useEffectsErrorHandler: false }
  );

  customersEditAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(customersActionsType.editCustomers),
        mergeMap((action: any): Observable<any> => {
          return this.dataService.editCustomers(action.payload.code, action.payload.data).pipe(
            map((res: object) => {
              if (res) {
                return new EditCustomersSuccessAction({
                  code: action.payload.code,
                  newCode: action.payload.newCode,
                  data: action.payload.data
                });
              }
              throw new Error();
            }),
            catchError((s) => of(new EditCustomersFailAction({ message: 'Error editing catalog' })))
          );
        })
      ),
    { useEffectsErrorHandler: false }
  );
}
