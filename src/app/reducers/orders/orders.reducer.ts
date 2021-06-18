import { OrdersActions, ordersActionsType } from 'src/app/reducers/orders/orders.actions';
import { IOrdersState } from '../../interfaces/interfaces';
import { Action } from '@ngrx/store';

export const ordersNode = 'orders';

const ordersState: IOrdersState = {
  '35322': {
    dropdown: 'chevron-down',
    orderNo: 35322,
    customer: 'Burger Bar',
    customerNo: 'BB-243',
    items: 12,
    notes: 'Please deliver this to Tom in person.',
    ordered: 1623045600000,
    delivery: 1623045600000,
    status: false,
    product: {
      productCode: 'APP123',
      productName: 'Apples',
      unit: 'kg',
      quantity: 14
    },
    address: 'West Street 23, 1453 Zurich'
  },
  '32342': {
    dropdown: 'chevron-down',
    orderNo: 32342,
    customer: 'Gyoza SS',
    customerNo: 'GZ-889',
    items: 75,
    notes: 'Confirmed',
    ordered: 1623132000000,
    delivery: 1623132000000,
    status: true,
    product: {
      productCode: 'TOM53',
      productName: 'Tomatos',
      unit: 'box',
      quantity: 4
    },
    address: 'Main Street 23, 1453 Cers'
  },
  '23424': {
    dropdown: 'chevron-down',
    orderNo: 23424,
    customer: 'Burger Bar',
    customerNo: 'BB-243',
    items: 9,
    notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
    ordered: 1623218400000,
    delivery: 1623218400000,
    status: true,
    product: {
      productCode: 'CUC997',
      productName: 'Cucumber',
      unit: 'pcs',
      quantity: 36
    },
    address: 'Nord Street 32, 5664 Upres'
  }
};

export const ordersReducer = (state = ordersState, action: Action): IOrdersState => {
  const ordersActions = action as OrdersActions;
  switch (ordersActions.type) {
    case ordersActionsType.confirmOrders:
      return {
        ...state,
        [ordersActions.payload.code]: {
          ...state[ordersActions.payload.code],
          status: true
        }
      };
    default:
      return state;
  }
};
