import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { DataService } from '../../services/data/data.service';
import { Observable, of } from 'rxjs';
import {
  ordersActionsType,
  ConfirmOrdersSuccessAction,
  ConfirmOrdersFailAction
} from './orders.actions';

@Injectable()
export class OrdersEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
  ) {
  }

  ordersConfirmAction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ordersActionsType.confirmOrders),
        mergeMap((action: any): Observable<any> => {
          return this.dataService.confirmOrders(action.payload.code).pipe(
            map((res: object) => {
              if (res) {
                return new ConfirmOrdersSuccessAction({ code: action.payload.code });
              }
              throw new Error();
            }),
            catchError((s) => of(new ConfirmOrdersFailAction({ message: 'Error confirmed order' })))
          );
        })
      ),
    { useEffectsErrorHandler: false }
  );
}
