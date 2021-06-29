import { Action } from '@ngrx/store';

import { ICustomersState } from 'src/app/interfaces/interfaces';
import { CustomersActions, customersActionsType } from 'src/app/reducers/customers/customers.actions';

export const customersNode = 'customers';

const customersState: ICustomersState = {
  'BB-123': {
    customerNo: 'BB-123',
    name: 'Burger Bar',
    address: 'Main Street, 1234 Zurich',
    days: {
      Mon: true,
      Tue: false,
      Wed: true,
      Thu: false,
      Fri: false,
      Sat: true,
      Sun: false
    },
    notify: false,
    contactName: 'Vlad',
    contactPhone: '0639999999',
    productsCodes: ['APP123', 'TOM53', 'CUC997']
  },
  'GZ-889': {
    customerNo: 'GZ-889',
    name: 'Gyoza SS',
    address: 'Second Street 3421 Geneva',
    days: {
      Mon: false,
      Tue: true,
      Wed: false,
      Thu: false,
      Fri: true,
      Sat: false,
      Sun: true
    },
    notify: false,
    contactName: 'Artem',
    contactPhone: '0639999999',
    productsCodes: ['APP123', 'TOM53', 'CUC997']
  }
};

export const customersReducer = (state = customersState, action: Action): ICustomersState => {
  const customerActions = action as CustomersActions;
  switch (customerActions.type) {
    case customersActionsType.addNewCustomers:
      return {
        ...state,
        [customerActions.payload.code]: customerActions.payload.data
      };
    case customersActionsType.editCustomers:
      const editState: ICustomersState = { ...state };
      delete editState[customerActions.payload.code];
      return {
        ...editState,
        [customerActions.payload.newCode]: customerActions.payload.data
      };
    case customersActionsType.deleteCustomers:
      const newState: ICustomersState = { ...state };
      delete newState[customerActions.payload.code];
      return newState;
    default:
      return state;
  }
};
