import { CatalogActions, catalogActionsType } from 'src/app/reducers/catalog/catalog.actions';
import { ICatalogState } from '../../interfaces/interfaces';
import { Action } from '@ngrx/store';

export const catalogNode = 'catalog';

const catalogState: ICatalogState = {
  APP123: {
    code: 'APP123',
    name: 'Apples',
    units: [
      { unit: 'kg', price: '2.03' },
      { unit: 'pcs', price: '0.5' },
      { unit: 'box', price: '5.2' }
    ],
    availability: `In stock`,
    actions: `trash`,
    exclusively: ['TOM53', 'APP123'],
    replacementProducts: ['13423-kd']
  },
  TOM53: {
    code: 'TOM53',
    name: 'Tomatos',
    units: [
      { unit: 'box', price: '5.2' },
      { unit: 'kg', price: '2.03' }
    ],
    availability: `In stock`,
    actions: `trash`,
    exclusively: ['TOM53', 'APP123'],
    replacementProducts: ['13423-kd']
  },
  CUC997: {
    code: 'CUC997',
    name: 'Cucumbers',
    units: [
      { unit: 'pcs', price: '0.5' }
    ],
    availability: `Out of stock`,
    actions: `trash`,
    exclusively: ['CUC997'],
    replacementProducts: ['13423-kd']
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
    case catalogActionsType.editCatalog:
      const editState = {...state};
      delete editState[catalogActions.payload.code];
      return  {
        ...editState,
        [catalogActions.payload.newCode]: catalogActions.payload.data
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
