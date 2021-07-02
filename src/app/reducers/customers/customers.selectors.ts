import { ICustomersData, ICustomersState } from 'src/app/interfaces/interfaces';

export const selectCustomersDataSource = (state: ICustomersState): ICustomersData => state.data;
