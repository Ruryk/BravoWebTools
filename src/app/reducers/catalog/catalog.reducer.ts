import { Action } from '@ngrx/store';

import { CatalogActions, catalogActionsType } from 'src/app/reducers/catalog/catalog.actions';
import { ICatalogState } from 'src/app/interfaces/interfaces';

export const catalogNode = 'catalog';

const catalogState: ICatalogState = {
    errorMessage: '',
    data: {}
  }
;

export const catalogReducer = (state = catalogState, action: Action): ICatalogState => {
  const catalogActions = action as CatalogActions;
  switch (catalogActions.type) {
    case catalogActionsType.setCatalogState:
      return {
        ...state,
        data: {
          ...state.data,
          ...catalogActions.payload.data
        }
      };
    case catalogActionsType.addNewCatalogSuccess:
      return {
        ...state,
        errorMessage: '',
        data: {
          ...state.data,
          [catalogActions.payload.code]: catalogActions.payload.data
        }
      };
    case catalogActionsType.addNewCatalogFail:
      return {
        ...state,
        errorMessage: catalogActions.payload.message
      };
    case catalogActionsType.editCatalogSuccess:
      const editState = { ...state };
      const editDataState = { ...editState.data };
      delete editDataState[catalogActions.payload.code];
      return {
        ...editState,
        data: {
          ...editDataState,
          [catalogActions.payload.newCode]: catalogActions.payload.data
        }
      };
    case catalogActionsType.editCatalogFail:
      return {
        ...state,
        errorMessage: catalogActions.payload.message
      };
    case catalogActionsType.replaceCatalog:
      return {
        ...state,
        data: {
          ...state.data,
          [catalogActions.payload.code]: catalogActions.payload.data
        }
      };
    case catalogActionsType.deleteCatalogSuccess:
      const newState: ICatalogState = { ...state };
      const newDataState = { ...newState.data };
      delete newDataState[catalogActions.payload.code];
      return {
        ...newState,
        data: {
          ...newDataState
        }
      };
    case catalogActionsType.deleteCatalogFail:
      return {
        ...state,
        errorMessage: catalogActions.payload.message
      };
    default:
      return state;
  }
};
