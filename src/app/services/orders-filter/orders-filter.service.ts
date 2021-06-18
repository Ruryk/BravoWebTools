import { Injectable } from '@angular/core';
import { IOrders, IOrdersState, OrdersTableElement, OrdersTableElementItem } from '../../interfaces/interfaces';
import { getOrdersDataSource, IState } from '../../reducers';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class OrdersFilterService {
  public displayedColumns: string[] = ['dropdown', 'orderNo', 'customer', 'customerNo', 'items', 'notes', 'ordered', 'delivery', 'status'];
  public displayedColumnsItem: string[] = ['productCode', 'productName', 'unit', 'quantity'];
  public expandedElement: OrdersTableElement | null;
  public dataOrders = this.store.select(getOrdersDataSource);
  public dataSource: MatTableDataSource<IOrders>;
  public dataSourceItem: MatTableDataSource<OrdersTableElementItem>;
  public status: any = [
    { value: '', viewValue: 'All' },
    { value: 'confirm', viewValue: 'Confirm' },
    { value: 'confirmed', viewValue: 'Confirmed' }
  ];
  public filterValues: any = {
    customer: [],
    column: 'customer'
  };

  constructor(private store: Store<IState>) {
    this.expandedElement = null;
    this.dataSource = new MatTableDataSource<IOrders>();
    this.dataSourceItem = new MatTableDataSource<OrdersTableElementItem>();
    this.dataOrders.subscribe((data: IOrdersState) => this.dataSource.data = Object.values(data));
    this.dataSourceItem = this.dataSource.data.reduce((acc: any, item: IOrders) => {
      const data = {
        productCode: item.product?.productCode,
        productName: item.product?.productName,
        unit: item.product?.unit,
        quantity: item.product?.quantity
      };
      acc.push(data);
      return acc;
    }, [] as any);
    this.setDataSourceFiltering();
  }

  setDataSourceFiltering(): void {
    this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      const column = searchString.column;
      let isPositionAvailable = false;
      if (searchString.customer.length) {
        if (column !== 'delivery' && column !== 'orderNo' && column !== 'status') {
          for (const d of searchString.customer) {
            if (data[column].trim() === d) {
              isPositionAvailable = true;
            }
          }
        } else if (column === 'status') {
          if (data[column] === searchString.customer[0]) {
            isPositionAvailable = true;
          }
        } else if (column === 'orderNo') {
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
    this.dataSource.filter = JSON.stringify({ customer: [filterValue], column: 'orderNo' });
  }

  statusFilter(value: string): void {
    const status = (value === 'confirmed') ? true : false;
    if (value === '') {
      this.dataSource.filter = JSON.stringify({ customer: [] });
    } else {
      this.dataSource.filter = JSON.stringify({ customer: [status], column: 'status' });
    }
  }

  dateFilter(startDate: number, endDate: number): void {
    if (!isNaN(endDate)) {
      this.dataSource.filter = JSON.stringify({ customer: [startDate, endDate + 100000], column: 'delivery' });
    } else {
      this.dataSource.filter = JSON.stringify({ customer: [startDate], column: 'delivery' });
    }
  }
}
