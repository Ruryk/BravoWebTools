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
import { EErrorMessages } from '../../enums/enums';

@Injectable()
export class CustomersEffects {
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
          return this.dataService.addNewCustomers(action.payload.data)
            .pipe(
              map((res: object) => {
                if (res) {
                  return new AddNewCustomersSuccessAction({
                    code: action.payload.code,
                    data: action.payload.data
                  });
                }
                throw new Error();
              }),
              catchError((s) => of(
                new AddNewCustomersFailAction({
                  error: {
                    status: true,
                    message: EErrorMessages.CustomerAdd
                  }
                }))
              )
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
          return this.dataService.editCustomers(action.payload.code, action.payload.data)
            .pipe(
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
              catchError((s) => of(
                new EditCustomersFailAction({
                  error: {
                    status: true,
                    message: EErrorMessages.CustomerEdit
                  }
                }))
              )
            );
        })
      ),
    { useEffectsErrorHandler: false }
  );
}
