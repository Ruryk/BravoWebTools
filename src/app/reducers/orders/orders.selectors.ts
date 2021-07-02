import { IOrdersState, IOrders, IOrdersData } from 'src/app/interfaces/interfaces';

export const selectOrdersDataSource = (state: IOrdersState): IOrdersData => state.data;
export const selectOrdersDataSourceForId = (state: IOrdersState, props: { id: string }): IOrders => state.data[props.id];
