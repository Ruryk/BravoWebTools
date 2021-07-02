import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';

import { IFilterValues, IOrders, IOrdersData, IOrdersState, IStatus, OrdersTableElement } from 'src/app/interfaces/interfaces';
import { getOrdersDataSource, IState } from 'src/app/reducers';
import { EOrdersColumn, EStatus } from 'src/app/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class OrdersFilterService {
  public expandedElement: OrdersTableElement | null;
  public dataOrders = this.store.select(getOrdersDataSource);
  public dataSource: MatTableDataSource<IOrders>;
  public status: IStatus[] = [
    { value: '', viewValue: 'All' },
    { value: 'confirm', viewValue: 'Confirm' },
    { value: 'confirmed', viewValue: 'Confirmed' }
  ];
  public filterValues: IFilterValues = {
    customer: [],
    column: EOrdersColumn.Customer
  };

  constructor(private store: Store<IState>) {
    this.expandedElement = null;
    this.dataSource = new MatTableDataSource<IOrders>();
    this.dataOrders.subscribe((data: IOrdersData) => this.dataSource.data = Object.values(data));
    this.setDataSourceFiltering();
  }

  setDataSourceFiltering(): void {
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      const column = searchString.column;
      if (searchString.customer.length) {
        switch (column) {
          case EOrdersColumn.Status:
            return data[column] === searchString.customer[0];
          case EOrdersColumn.OrderNo:
            return data[column].toString().includes(searchString.customer[0].toString());
          case EOrdersColumn.Delivery:
            if (searchString.customer.length === 2) {
              return (data[column] >= searchString.customer[0] && data[column] <= searchString.customer[1]);
            }
            return (data[column] >= searchString.customer[0]);
          default:
            return Object.values(searchString.customer)
              .some((value: any) => value.toLowerCase() === data[column].trim().toLowerCase());
        }
      }
      return true;
    };
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = JSON.stringify({ customer: [filterValue], column: EOrdersColumn.CustomerNo });
  }

  setStatusFilter(value: string): void {
    const status = (value === EStatus.Confirmed);
    if (value === '') {
      this.dataSource.filter = JSON.stringify({ customer: [] });
    } else {
      this.dataSource.filter = JSON.stringify({ customer: [status], column: EOrdersColumn.Status });
    }
  }

  setDateFilter(startDate: number, endDate: number): void {
    console.log(endDate);
    if (!isNaN(endDate)) {
      this.dataSource.filter = JSON.stringify({ customer: [startDate, endDate + 100000], column: EOrdersColumn.Delivery });
    } else {
      this.dataSource.filter = JSON.stringify({ customer: [startDate], column: EOrdersColumn.Delivery });
    }
  }
}
