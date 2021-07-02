import { Action } from '@ngrx/store';
import { IOrdersData } from '../../interfaces/interfaces';

export enum ordersActionsType {
  setOrdersState = '[ORDERS] setOrdersState',
  confirmOrders = '[ORDERS] confirmOrders',
  confirmOrdersSuccess = '[ORDERS] confirmOrdersSuccess',
  confirmOrdersFail = '[ORDERS] confirmOrdersFail'
}

export class ConfirmOrdersAction implements Action {
  readonly type = ordersActionsType.confirmOrders;
  constructor(public payload: { code: string }) { }
}

export class ConfirmOrdersSuccessAction implements Action {
  readonly type = ordersActionsType.confirmOrdersSuccess;
  constructor(public payload: { code: string }) { }
}

export class ConfirmOrdersFailAction implements Action {
  readonly type = ordersActionsType.confirmOrdersFail;
  constructor(public payload: { message: string }) { }
}

export class SetOrdersStateAction implements Action {
  readonly type = ordersActionsType.setOrdersState;
  constructor(public payload: { data: IOrdersData }) { }
}

export type OrdersActions = ConfirmOrdersAction | ConfirmOrdersSuccessAction | ConfirmOrdersFailAction | SetOrdersStateAction;
