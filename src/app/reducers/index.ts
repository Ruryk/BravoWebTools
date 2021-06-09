import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import {  ICatalogState, ICustomersState } from 'src/app/interfaces/interfaces';
import { customersNode, customersReducer } from 'src/app/reducers/customers/customers.reducer';
import { catalogNode, catalogReducer } from './catalog/catalog.reducer';
import * as customerSelector from 'src/app/reducers/customers/customers.selectors';
import * as catalogSelector from 'src/app/reducers/catalog/catalog.selectors';

export interface IState {
  [customersNode]: ICustomersState;
  [catalogNode]: ICatalogState;
}

export const reducers: ActionReducerMap<IState> = {
  [customersNode]: customersReducer,
  [catalogNode]: catalogReducer
};

export const getCustomersState = (state: IState): ICustomersState => state[customersNode];
export const getCatalogState = (state: IState): ICatalogState => state[catalogNode];

// Customers Selectors
export const getCustomersDataSource = createSelector(
  getCustomersState,
  customerSelector.selectCustomersDataSource
);

// Catalog Selectors
export const getCatalogDataSource = createSelector(
  getCatalogState,
  catalogSelector.selectCatalogDataSource
);

export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];
