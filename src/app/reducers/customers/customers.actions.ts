import { Action } from '@ngrx/store';
import { ICustomers } from '../../interfaces/interfaces';

export enum customersActionsType {
  addNewCustomers = '[CUSTOMERS] addNewCustomers',
  deleteCustomers = '[CUSTOMERS] deleteCustomers'
}

export class AddNewCustomersAction implements Action {
  readonly type = customersActionsType.addNewCustomers;
  constructor(public payload: { code: string, data: ICustomers }) { }
}

export class DeleteCustomersAction implements Action {
  readonly type = customersActionsType.deleteCustomers;
  constructor(public payload: { code: string }) { }
}

export type CustomersActions = AddNewCustomersAction | DeleteCustomersAction;
