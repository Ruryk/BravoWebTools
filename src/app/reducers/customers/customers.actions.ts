import { Action } from '@ngrx/store';

import { ICustomers, ICustomersData } from 'src/app/interfaces/interfaces';

export enum customersActionsType {
  setCustomersState = '[CUSTOMERS] setCustomersState',
  addNewCustomers = '[CUSTOMERS] addNewCustomers',
  addNewCustomersSuccess = '[CUSTOMERS] addNewCustomersSuccess',
  addNewCustomersFail = '[CUSTOMERS] addNewCustomersFail',
  editCustomers = '[CUSTOMERS] editCustomers',
  editCustomersSuccess = '[CUSTOMERS] editCustomersSuccess',
  editCustomersFail = '[CUSTOMERS] editCustomersFail',
  deleteCustomers = '[CUSTOMERS] deleteCustomers'
}

export class SetCustomersStateAction implements Action {
  readonly type = customersActionsType.setCustomersState;

  constructor(public payload: { data: ICustomersData }) {
  }
}

export class AddNewCustomersAction implements Action {
  readonly type = customersActionsType.addNewCustomers;

  constructor(public payload: { code: string, data: ICustomers }) {
  }
}

export class AddNewCustomersSuccessAction implements Action {
  readonly type = customersActionsType.addNewCustomersSuccess;

  constructor(public payload: { code: string, data: ICustomers }) {
  }
}

export class AddNewCustomersFailAction implements Action {
  readonly type = customersActionsType.addNewCustomersFail;

  constructor(public payload: { message: string }) {
  }
}

export class EditCustomersAction implements Action {
  readonly type = customersActionsType.editCustomers;

  constructor(public payload: { code: string, newCode: string, data: ICustomers }) {
  }
}

export class EditCustomersSuccessAction implements Action {
  readonly type = customersActionsType.editCustomersSuccess;

  constructor(public payload: { code: string, newCode: string, data: ICustomers }) {
  }
}

export class EditCustomersFailAction implements Action {
  readonly type = customersActionsType.editCustomersFail;

  constructor(public payload: { message: string }) {
  }
}

export class DeleteCustomersAction implements Action {
  readonly type = customersActionsType.deleteCustomers;

  constructor(public payload: { code: string }) {
  }
}

export type CustomersActions = SetCustomersStateAction |
  AddNewCustomersSuccessAction |
  AddNewCustomersFailAction |
  AddNewCustomersAction |
  DeleteCustomersAction |
  EditCustomersSuccessAction |
  EditCustomersFailAction |
  EditCustomersAction;
