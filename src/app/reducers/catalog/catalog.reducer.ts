import { CatalogActions, catalogActionsType } from 'src/app/reducers/catalog/catalog.actions';
import { ICatalogState } from '../../interfaces/interfaces';
import { Action } from '@ngrx/store';

export const catalogNode = 'catalog';

const catalogState: ICatalogState = {
  APP123: {
    code: 'APP123',
    name: 'Apples',
    unit: ['kg', 'pcs', 'box'], // 'kg +2 more'
    price: 2.03,
    availability: `In stock`,
    actions: `trash`
  },
  TOM53: {
    code: 'TOM53',
    name: 'Tomatos',
    unit: ['box', 'pcs'], // 'box +1 more'
    price: 12.03,
    availability: `In stock`,
    actions: `trash`
  },
  CUC997: {
    code: 'CUC997',
    name: 'Cucumbers',
    unit: ['pcs'],
    price: 0.52,
    availability: `Out of stock`,
    actions: `trash`
  }
};

export const catalogReducer = (state = catalogState, action: Action): ICatalogState => {
  const catalogActions = action as CatalogActions;
  switch (catalogActions.type) {
    case catalogActionsType.addNewCatalog:
      return {
        ...state,
        [catalogActions.payload.code]: catalogActions.payload.data
      };
    case catalogActionsType.replaceCatalog:
      return {
        ...state,
        [catalogActions.payload.code]: catalogActions.payload.data
      };
    case catalogActionsType.deleteCatalog:
      const newState: ICatalogState = { ...state };
      delete newState[catalogActions.payload.code];
      return newState;
    default:
      return state;
  }
};
