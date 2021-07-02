import { Action } from '@ngrx/store';

import { ICustomersState } from 'src/app/interfaces/interfaces';
import { CustomersActions, customersActionsType } from 'src/app/reducers/customers/customers.actions';

export const customersNode = 'customers';

const customersState: ICustomersState = {
  errorMessage: '',
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
    case customersActionsType.addNewCustomers:
      return {
        ...state,
        data: {
          ...state.data,
          [customerActions.payload.code]: customerActions.payload.data
        }
      };
    case customersActionsType.editCustomers:
      const editState: ICustomersState = { ...state };
      const editDataState = { ...editState.data };
      delete editDataState[customerActions.payload.code];
      return {
        ...editState,
        data: {
          ...editDataState,
          [customerActions.payload.newCode]: customerActions.payload.data
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
