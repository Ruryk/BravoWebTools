import { CustomersActions, customersActionsType } from 'src/app/reducers/customers/customers.actions';
import { ICustomersState } from '../../interfaces/interfaces';
import { Action } from '@ngrx/store';

export const customersNode = 'customers';

const customersState: ICustomersState = {
  'BB-123': {
    customerNo: 'BB-123',
    name: 'Burger Bar',
    address: 'Main Street, 1234 Zurich',
    days: ['Mon', 'Wed', 'Fri'],
    contactName: 'Vlad',
    phone: '0639999999',
    productsCodes: ['APP123', 'TOM53', 'CUC997']
  },
  'GZ-889': {
    customerNo: 'GZ-889',
    name: 'Gyoza SS',
    address: 'Second Street 3421 Geneva',
    days: ['Tue', 'Thu', 'Sat'],
    contactName: 'Artem',
    phone: '0639999999',
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
    case customersActionsType.deleteCustomers:
      const newState: ICustomersState = { ...state };
      delete newState[customerActions.payload.code];
      return newState;
    default:
      return state;
  }
};
