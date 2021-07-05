import { ICustomersData, ICustomersState } from 'src/app/interfaces/interfaces';

export const selectCustomersDataSource = (state: ICustomersState): ICustomersData => state.data;
export const selectCustomersErrorMessage = (state: ICustomersState): {type: string, status: boolean, message: string} => state.error;
