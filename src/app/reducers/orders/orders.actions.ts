import { Action } from '@ngrx/store';

export enum ordersActionsType {
  confirmOrders = '[ORDERS] confirmOrders'
}

export class ConfirmOrdersAction implements Action {
  readonly type = ordersActionsType.confirmOrders;
  constructor(public payload: { code: string }) { }
}

export type OrdersActions = ConfirmOrdersAction;
