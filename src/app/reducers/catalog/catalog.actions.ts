import { Action } from '@ngrx/store';

import { ICatalog, ICatalogData, ICatalogState } from 'src/app/interfaces/interfaces';

export enum catalogActionsType {
  setCatalogState = '[CATALOG] setCatalogState',
  editCatalog = '[CATALOG] editCatalog',
  editCatalogSuccess = '[CATALOG] editCatalogSuccess',
  editCatalogFail = '[CATALOG] editCatalogFail',
  deleteCatalog = '[CATALOG] deleteCatalog',
  deleteCatalogSuccess = '[CATALOG] deleteCatalogSuccess',
  deleteCatalogFail = '[CATALOG] deleteCatalogFail',
  replaceCatalog = '[CATALOG] replaceCatalog',
  addNewCatalog = '[CATALOG] addNewCatalog',
  addNewCatalogSuccess = '[CATALOG] addNewCatalogSuccess',
  addNewCatalogFail= '[CATALOG] addNewCatalogFail'
}

export class SetCatalogStateAction implements Action {
  readonly type = catalogActionsType.setCatalogState;

  constructor(public payload: { data: ICatalogData }) {
  }
}

export class AddNewCatalogAction implements Action {
  readonly type = catalogActionsType.addNewCatalog;

  constructor(public payload: { code: string, data: ICatalog }) {
  }
}

export class AddNewCatalogSuccessAction implements Action {
  readonly type = catalogActionsType.addNewCatalogSuccess;

  constructor(public payload: { code: string, data: ICatalog }) {
  }
}

export class AddNewCatalogFailAction implements Action {
  readonly type = catalogActionsType.addNewCatalogFail;

  constructor(public payload: { error: { status: boolean, message: string } }) {
  }
}

export class EditCatalogAction implements Action {
  readonly type = catalogActionsType.editCatalog;

  constructor(public payload: { code: string, newCode: string, data: ICatalog }) {
  }
}

export class EditCatalogSuccessAction implements Action {
  readonly type = catalogActionsType.editCatalogSuccess;

  constructor(public payload: { code: string, newCode: string, data: ICatalog }) {
  }
}

export class EditCatalogFailAction implements Action {
  readonly type = catalogActionsType.editCatalogFail;

  constructor(public payload: { error: { status: boolean, message: string } }) {
  }
}

export class DeleteCatalogAction implements Action {
  readonly type = catalogActionsType.deleteCatalog;

  constructor(public payload: { code: string }) {
  }
}

export class DeleteCatalogSuccessAction implements Action {
  readonly type = catalogActionsType.deleteCatalogSuccess;

  constructor(public payload: { code: string }) {
  }
}

export class DeleteCatalogFailAction implements Action {
  readonly type = catalogActionsType.deleteCatalogFail;

  constructor(public payload: { error: { status: boolean, message: string } }) {
  }
}

export class ReplaceCatalogAction implements Action {
  readonly type = catalogActionsType.replaceCatalog;

  constructor(public payload: { code: string, data: ICatalog }) {
  }
}

export type CatalogActions = SetCatalogStateAction |
  DeleteCatalogAction |
  DeleteCatalogSuccessAction |
  DeleteCatalogFailAction |
  ReplaceCatalogAction |
  EditCatalogAction |
  EditCatalogSuccessAction|
  EditCatalogFailAction |
  AddNewCatalogAction |
  AddNewCatalogSuccessAction |
  AddNewCatalogFailAction;
