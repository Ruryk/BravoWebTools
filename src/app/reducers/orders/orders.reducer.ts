import { Action } from '@ngrx/store';

import { OrdersActions, ordersActionsType } from 'src/app/reducers/orders/orders.actions';
import { IOrdersState } from 'src/app/interfaces/interfaces';

export const ordersNode = 'orders';

const ordersState: IOrdersState = {
  errorMessage: '',
  data: {}
};

export const ordersReducer = (state = ordersState, action: Action): IOrdersState => {
  const ordersActions = action as OrdersActions;
  switch (ordersActions.type) {
    case ordersActionsType.setOrdersState:
      return {
        ...state,
        errorMessage: '',
        data: ordersActions.payload.data
      };
      case ordersActionsType.confirmOrdersSuccess:
      return {
        ...state,
        errorMessage: '',
        data: {
          ...state.data,
          [ordersActions.payload.code]: {
            ...state.data[ordersActions.payload.code],
            status: true
          }
        }
      };
    case ordersActionsType.confirmOrdersFail:
      return {
        ...state,
        errorMessage: ordersActions.payload.message
      };
    default:
      return state;
  }
};
