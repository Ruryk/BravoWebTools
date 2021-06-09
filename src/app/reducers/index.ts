import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { ICustomersState } from 'src/app/interfaces/interfaces';
import { customersNode, customersReducer } from 'src/app/reducers/customers/customers.reducer';
import * as customerSelector from 'src/app/reducers/customers/customers.selectors';

export interface IState {
  [customersNode]: ICustomersState;
}

export const reducers: ActionReducerMap<IState> = {
  [customersNode]: customersReducer
};
export const getCustomersState = (state: IState): ICustomersState => state[customersNode];

// Customers Selectors
export const getCustomersDataSource = createSelector(
  getCustomersState,
  customerSelector.selectCustomersDataSource
);

export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];
