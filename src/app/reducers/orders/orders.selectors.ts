import { IOrdersState, IOrders } from 'src/app/interfaces/interfaces';

export const selectOrdersDataSource = (state: IOrdersState): IOrdersState => state;
export const selectOrdersDataSourceForId = (state: IOrdersState, props: { id: string }): IOrders => state[props.id];
