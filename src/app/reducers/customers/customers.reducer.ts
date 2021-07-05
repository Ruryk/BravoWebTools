import { Action } from '@ngrx/store';

import { ICustomersState } from 'src/app/interfaces/interfaces';
import { CustomersActions, customersActionsType } from 'src/app/reducers/customers/customers.actions';

export const customersNode = 'customers';

const customersState: ICustomersState = {
  error: {
    type: 'Add',
    status: false,
    message: 'Customer was added successfully'
  },
  data: {}
};

export const customersReducer = (state: ICustomersState = customersState, action: Action): ICustomersState => {
  const customerActions = action as CustomersActions;
  switch (customerActions.type) {
    case customersActionsType.setCustomersState:
      return {
        ...state,
        data: customerActions.payload.data
      };
    case customersActionsType.addNewCustomersSuccess:
      return {
        ...state,
        error: {
          type: 'Add',
          status: false,
          message: 'Product was added successfully'
        },
        data: {
          ...state.data,
          [customerActions.payload.code]: customerActions.payload.data
        }
      };
      case customersActionsType.addNewCustomersFail:
      return {
        ...state,
        error: {
          type: 'Add',
          status: customerActions.payload.error.status,
          message: customerActions.payload.error.message
        }
      };
    case customersActionsType.editCustomersSuccess:
      const editState: ICustomersState = { ...state };
      const editDataState = { ...editState.data };
      delete editDataState[customerActions.payload.code];
      return {
        ...editState,
        error: {
          type: 'Edit',
          status: false,
          message: 'Product was edited successfully'
        },
        data: {
          ...editDataState,
          [customerActions.payload.newCode]: customerActions.payload.data
        }
      };
      case customersActionsType.editCustomersFail:
      return {
        ...state,
        error: {
          type: 'Edit',
          status: customerActions.payload.error.status,
          message: customerActions.payload.error.message
        }
      };
    case customersActionsType.deleteCustomers:
      const newState: ICustomersState = { ...state };
      const newDataState = {...newState.data};
      delete newDataState[customerActions.payload.code];
      return { ...newState, data: newDataState };
    default:
      return state;
  }
};
