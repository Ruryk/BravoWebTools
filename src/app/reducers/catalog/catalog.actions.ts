import { Action } from '@ngrx/store';
import { ICatalog } from '../../interfaces/interfaces';

export enum catalogActionsType {
  addNewCatalog = '[CATALOG] addNewCatalog',
  editCatalog = '[CATALOG] editCatalog',
  deleteCatalog = '[CATALOG] deleteCatalog',
  replaceCatalog = '[CATALOG] replaceCatalog'
}

export class AddNewCatalogAction implements Action {
  readonly type = catalogActionsType.addNewCatalog;
  constructor(public payload: { code: string, data: ICatalog }) { }
}

export class EditCatalogAction implements Action {
  readonly type = catalogActionsType.editCatalog;
  constructor(public payload: { code: string, newCode: string, data: ICatalog }) { }
}

export class DeleteCatalogAction implements Action {
  readonly type = catalogActionsType.deleteCatalog;
  constructor(public payload: { code: string }) { }
}

export class ReplaceCatalogAction implements Action {
  readonly type = catalogActionsType.replaceCatalog;
  constructor(public payload: { code: string, data: ICatalog }) { }
}

export type CatalogActions = AddNewCatalogAction | DeleteCatalogAction | ReplaceCatalogAction | EditCatalogAction;
