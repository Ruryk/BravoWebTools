import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import {
  ICatalog,
  ICatalogData,
  ICatalogState,
  ICustomers,
  ICustomersData,
  IOrders,
  IOrdersData
} from 'src/app/interfaces/interfaces';
import { IState } from 'src/app/reducers';
import { config } from 'src/app/constantes/constantes';
import { SetCatalogStateAction } from '../../reducers/catalog/catalog.actions';
import { Observable } from 'rxjs';
import { SetCustomersStateAction } from '../../reducers/customers/customers.actions';
import { SetOrdersStateAction } from '../../reducers/orders/orders.actions';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private store: Store<IState>
  ) {
  }

  async getCatalogList(): Promise<void> {
    this.http.get(`${ config.server }/catalog`).subscribe((res: any) => {
      const catalogState = res.reduce((data: ICatalogData, item: ICatalog) => {
        data[item.code] = item;
        return data;
      }, {} as ICatalogState);
      this.store.dispatch(new SetCatalogStateAction({ data: catalogState }));
    });
  }

  addNewCatalog(data: ICatalog): Observable<object> {
    return this.http.post(`${ config.server }/catalog/new`, { data });
  }

  editCatalog(code: string, data: ICatalog): Observable<object> {
    return this.http.post(`${ config.server }/catalog/edit`, { code, data });
  }

  deleteCatalog(code: string): Observable<object> {
    return this.http.post(`${ config.server }/catalog/delete`, { code });
  }

  async getCustomersList(): Promise<void> {
    this.http.get(`${ config.server }/customers`).subscribe((res: any) => {
      const customersState = res.reduce((data: ICustomersData, item: ICustomers) => {
        data[item.customerNo] = item;
        return data;
      }, {} as ICustomersData);
      this.store.dispatch(new SetCustomersStateAction({ data: customersState }));
    });
  }

  addNewCustomers(data: ICustomers): Observable<object> {
    return this.http.post(`${ config.server }/customers/new`, { data });
  }

  editCustomers(code: string, data: ICustomers): Observable<object> {
    return this.http.post(`${ config.server }/customers/edit`, { code, data });
  }

  async getOrdersList(): Promise<void> {
    this.http.get(`${ config.server }/orders`).subscribe((res: any) => {
      const ordersState = res.reduce((data: IOrdersData, item: IOrders) => {
        data[item.orderNo] = item;
        return data;
      }, {} as IOrdersData);
      this.store.dispatch(new SetOrdersStateAction({ data: ordersState }));
    });
  }

  getOrdersById(id: string): Observable<any> {
    return this.http.get(`${ config.server }/orders/` + id);
  }

  confirmOrders(code: string): Observable<object> {
    return this.http.post(`${ config.server }/orders/confirm`, { code });
  }
}
