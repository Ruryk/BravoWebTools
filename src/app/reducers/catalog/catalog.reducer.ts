import { Action } from '@ngrx/store';

import { CatalogActions, catalogActionsType } from 'src/app/reducers/catalog/catalog.actions';
import { ICatalogState } from 'src/app/interfaces/interfaces';

export const catalogNode = 'catalog';

const catalogState: ICatalogState = {
    error: {
      type: 'Add',
      status: false,
      message: 'Product was added successfully'
    },
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
        error: {
          type: 'Add',
          status: false,
          message: 'Product was added successfully'
        },
        data: {
          ...state.data,
          [catalogActions.payload.code]: catalogActions.payload.data
        }
      };
    case catalogActionsType.addNewCatalogFail:
      return {
        ...state,
        error: {
          type: 'Add',
          status: catalogActions.payload.error.status,
          message: catalogActions.payload.error.message
        }
      };
    case catalogActionsType.editCatalogSuccess:
      const editState = { ...state };
      const editDataState = { ...editState.data };
      delete editDataState[catalogActions.payload.code];
      return {
        ...editState,
        error: {
          type: 'Edit',
          status: false,
          message: 'Product was edited successfully'
        },
        data: {
          ...editDataState,
          [catalogActions.payload.newCode]: catalogActions.payload.data
        }
      };
    case catalogActionsType.editCatalogFail:
      return {
        ...state,
        error: {
          type: 'Edit',
          status: catalogActions.payload.error.status,
          message: catalogActions.payload.error.message
        }
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
        error: {
          type: 'Delete',
          status: false,
          message: 'Product was deleted successfully'
        },
        data: {
          ...newDataState
        }
      };
    case catalogActionsType.deleteCatalogFail:
      return {
        ...state,
        error: {
          type: 'Delete',
          status: catalogActions.payload.error.status,
          message: catalogActions.payload.error.message
        }
      };
    default:
      return state;
  }
};
