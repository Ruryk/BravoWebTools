import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';

import {
  IOrders,
  IStatus,
  OrdersTableElement
} from 'src/app/interfaces/interfaces';
import { getOrdersDataSource, IState } from 'src/app/reducers';
import { EOrdersColumn, EStatus } from 'src/app/enums/enums';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CStatusOrder } from '../../constantes/constantes';

@Injectable({
  providedIn: 'root'
})
export class OrdersFilterService {
  public expandedElement: OrdersTableElement | null;
  public dataOrders = this.store.select(getOrdersDataSource);
  public dataSource: MatTableDataSource<IOrders>;
  public status: IStatus[] = CStatusOrder;
  public searchStringFilterValue: BehaviorSubject<string | null>;
  public statusFilterValue: BehaviorSubject<string | null>;
  public dateFilterValue: BehaviorSubject<number[] | null>;
  public customerFilterValue: BehaviorSubject<string[] | null>;

  constructor(private store: Store<IState>) {
    this.searchStringFilterValue = new BehaviorSubject<string | null>(null);
    this.statusFilterValue = new BehaviorSubject<string | null>(null);
    this.dateFilterValue = new BehaviorSubject<number[] | null>(null);
    this.customerFilterValue = new BehaviorSubject<string[] | null>(null);
    this.expandedElement = null;
    this.dataSource = new MatTableDataSource<IOrders>();
    this.setDataSourceFiltering();
  }

  setDataSourceFiltering(): void {
    combineLatest([
      this.searchStringFilterValue,
      this.statusFilterValue,
      this.dateFilterValue,
      this.customerFilterValue
    ]).pipe(
      switchMap(([
                   searchStringFilterSubject,
                   statusFilterSubject,
                   dateFilterSubject,
                   customerFilterSubject
                 ]) => this.dataOrders.pipe(
        map((data: any): any => {
          return Object.values(data).filter((order: any): any => {
            let isDate = true;
            let isSearchString = true;
            let isStatus = true;
            let isCustomer = true;
            if (dateFilterSubject) {
              isDate = this.setDateFiltration(dateFilterSubject, order);
            }
            if (customerFilterSubject) {
              isCustomer = this.setCustomerFiltration(customerFilterSubject, order);
            }
            if (searchStringFilterSubject) {
              isSearchString = this.setSearchStringFiltration(searchStringFilterSubject, order);
            }
            if (statusFilterSubject) {
              isStatus = this.setStatusFiltration(statusFilterSubject, order);
            }
            return isSearchString && isStatus && isDate && isCustomer;
          });
        })
      )),
    ).subscribe(data => this.dataSource.data = data);
  }

  setStatusFiltration(statusFilterSubject: string, order: IOrders): boolean {
    const statusTransformValue = (statusFilterSubject !== EStatus.Confirm);
    return order.status === statusTransformValue;
  }

  setCustomerFiltration(customerFilterSubject: string[], order: IOrders): boolean {
    return customerFilterSubject?.some((item: string) => item === order.customer);
  }

  setDateFiltration(date: number[], order: IOrders): boolean {
    const startDate = date[0];
    const endDate = date[1];
    if (!isNaN(endDate)) {
      return (order.delivery >= startDate && order.delivery <= endDate);
    }
    return (order.delivery >= startDate);
  }

  setSearchStringFiltration(searchStringFilterSubject: string, order: IOrders): boolean {
    return order.orderNo.toString().includes(searchStringFilterSubject) ||
      order.customer.toLowerCase().includes(searchStringFilterSubject) ||
      order.notes.toLowerCase().includes(searchStringFilterSubject);
  }
}
