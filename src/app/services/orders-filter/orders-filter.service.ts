import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';

import { IFilterValues, IOrders, IOrdersState, IStatus, OrdersTableElement } from 'src/app/interfaces/interfaces';
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
    this.dataOrders.subscribe((data: IOrdersState) => this.dataSource.data = Object.values(data));
    this.setDataSourceFiltering();
  }

  setDataSourceFiltering(): void {
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      const column = searchString.column;
      let isPositionAvailable = false;
      if (searchString.customer.length) {
        if (column !== EOrdersColumn.Delivery && column !== EOrdersColumn.OrderNo && column !== EOrdersColumn.Status) {
          for (const d of searchString.customer) {
            if (data[column].trim() === d) {
              isPositionAvailable = true;
            }
          }
        } else if (column === EOrdersColumn.Status) {
          if (data[column] === searchString.customer[0]) {
            isPositionAvailable = true;
          }
        } else if (column === EOrdersColumn.OrderNo) {
          if (data[column].toString().includes(searchString.customer[0].toString())) {
            isPositionAvailable = true;
          }
        } else {
          if (searchString.customer.length === 2) {
            isPositionAvailable = (data[column] >= searchString.customer[0] && data[column] <= searchString.customer[1]) ? true : false;
          } else {
            isPositionAvailable = (data[column] >= searchString.customer[0]) ? true : false;
          }
        }
      } else {
        isPositionAvailable = true;
      }
      return isPositionAvailable;

    };
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = JSON.stringify({ customer: [filterValue], column: EOrdersColumn.CustomerNo });
  }

  setStatusFilter(value: string): void {
    const status = (value === EStatus.Confirmed) ? true : false;
    if (value === '') {
      this.dataSource.filter = JSON.stringify({ customer: [] });
    } else {
      this.dataSource.filter = JSON.stringify({ customer: [status], column: EOrdersColumn.Status });
    }
  }

  setDateFilter(startDate: number, endDate: number): void {
    if (!isNaN(endDate)) {
      this.dataSource.filter = JSON.stringify({ customer: [startDate, endDate + 100000], column: EOrdersColumn.Delivery });
    } else {
      this.dataSource.filter = JSON.stringify({ customer: [startDate], column: EOrdersColumn.Delivery });
    }
  }
}
