import { Action } from '@ngrx/store';
import { ICustomers } from '../../interfaces/interfaces';

export enum customersActionsType {
  addNewCustomers = '[CUSTOMERS] addNewCustomers',
  editCustomers = '[CUSTOMERS] editCustomers',
  deleteCustomers = '[CUSTOMERS] deleteCustomers'
}

export class AddNewCustomersAction implements Action {
  readonly type = customersActionsType.addNewCustomers;
  constructor(public payload: { code: string, data: ICustomers }) { }
}

export class EditCustomersAction implements Action {
  readonly type = customersActionsType.editCustomers;
  constructor(public payload: { code: string, newCode: string, data: ICustomers }) { }
}

export class DeleteCustomersAction implements Action {
  readonly type = customersActionsType.deleteCustomers;
  constructor(public payload: { code: string }) { }
}

export type CustomersActions = AddNewCustomersAction | DeleteCustomersAction | EditCustomersAction;
