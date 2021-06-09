import { Action } from '@ngrx/store';

export enum ordersActionsType {
  confirmOrders = '[ORDERS] confirmOrders'
}

export class ConfirmCatalogAction implements Action {
  readonly type = ordersActionsType.confirmOrders;
  constructor(public payload: { code: number }) { }
}

export type OrdersActions = ConfirmCatalogAction;
