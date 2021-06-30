import { Action } from '@ngrx/store';

import { ICatalog, ICatalogState } from 'src/app/interfaces/interfaces';

export enum catalogActionsType {
  setCatalogState = '[CATALOG] setCatalogState',
  addNewCatalog = '[CATALOG] addNewCatalog',
  editCatalog = '[CATALOG] editCatalog',
  deleteCatalog = '[CATALOG] deleteCatalog',
  replaceCatalog = '[CATALOG] replaceCatalog',
  addNewCatalogSubmit = '[CATALOG] addNewCatalogSubmit'
}

export class SetCatalogStateAction implements Action {
  readonly type = catalogActionsType.setCatalogState;

  constructor(public payload: { data: ICatalogState }) {
  }
}

export class AddNewCatalogAction implements Action {
  readonly type = catalogActionsType.addNewCatalog;

  constructor(public payload: { code: string, data: ICatalog }) {
  }
}

export class AddNewCatalogSubmitAction implements Action {
  readonly type = catalogActionsType.addNewCatalogSubmit;

  constructor(public payload: { code: string, data: ICatalog }) {
  }
}

export class EditCatalogAction implements Action {
  readonly type = catalogActionsType.editCatalog;

  constructor(public payload: { code: string, newCode: string, data: ICatalog }) {
  }
}

export class DeleteCatalogAction implements Action {
  readonly type = catalogActionsType.deleteCatalog;

  constructor(public payload: { code: string }) {
  }
}

export class ReplaceCatalogAction implements Action {
  readonly type = catalogActionsType.replaceCatalog;

  constructor(public payload: { code: string, data: ICatalog }) {
  }
}

export type CatalogActions = SetCatalogStateAction |
  AddNewCatalogAction |
  DeleteCatalogAction |
  ReplaceCatalogAction |
  EditCatalogAction |
  AddNewCatalogSubmitAction;
