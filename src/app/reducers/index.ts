import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { ICatalogState, ICustomersState,  IOrdersState } from 'src/app/interfaces/interfaces';
import { customersNode, customersReducer } from 'src/app/reducers/customers/customers.reducer';
import * as customerSelector from 'src/app/reducers/customers/customers.selectors';
import * as catalogSelector from 'src/app/reducers/catalog/catalog.selectors';
import * as ordersSelector from 'src/app/reducers/orders/orders.selectors';
import { catalogNode, catalogReducer } from './catalog/catalog.reducer';
import { ordersNode, ordersReducer } from './orders/orders.reducer';

export interface IState {
  [customersNode]: ICustomersState;
  [catalogNode]: ICatalogState;
  [ordersNode]: IOrdersState;
}

export const reducers: ActionReducerMap<IState> = {
  [customersNode]: customersReducer,
  [catalogNode]: catalogReducer,
  [ordersNode]: ordersReducer
};

export const getCustomersState = (state: IState): ICustomersState => state[customersNode];
export const getCatalogState = (state: IState): ICatalogState => state[catalogNode];
export const getOrdersState = (state: IState): IOrdersState => state[ordersNode];

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

// Orders Selectors
export const getOrdersDataSource = createSelector(
  getOrdersState,
  ordersSelector.selectOrdersDataSource
);
export const getOrdersDataSourceForId = createSelector(
  getOrdersState,
  ordersSelector.selectOrdersDataSourceForId
);

export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];
